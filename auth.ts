import NextAuth, { CredentialsSignin } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { verifyMessage } from "ethers";
import { mongodbConnect } from "./mongoDb/connect";
import User from "./mongoDb/schema/userSchema";

class InvalidLogin extends CredentialsSignin {
  code = "請再重新登入一次";
}

class AdminLogin extends CredentialsSignin {
  code = "您未被授權使用管理員登入";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [
    credentialsProvider({
      name: "Farmer",
      id: "Farmer",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "" },
        signature: { label: "Signature", type: "text", placeholder: "" },
      },
      //@ts-ignore
      async authorize(
        credentials: { message: string; signature: string },
        request
      ) {
        if (credentials) {
          const { message, signature } = credentials;
          const signerAddress = verifyMessage(message, signature);
          console.log("signerAddress", signerAddress);

          try {
            await mongodbConnect();
            const user = await User.findOne({
              address: signerAddress,
              role: "farmer",
            });

            if (user && user.isFarmer()) {
              console.log(user);

              return user;
            } else {
              const user = new User({
                address: signerAddress,
                role: "farmer",
              });
              await user.save();
              return user;
            }
          } catch (error) {
            throw new InvalidLogin();
          }
        }
      },
    }),
    credentialsProvider({
      name: "Admin",
      id: "Admin",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "" },
        signature: { label: "Signature", type: "text", placeholder: "" },
      },
      //@ts-ignore
      async authorize(
        credentials: { message: string; signature: string },
        request
      ) {
        if (credentials) {
          const { message, signature } = credentials;

          const signerAddress = verifyMessage(message, signature);
          try {
            await mongodbConnect();
            const user = await User.findOne({
              address: signerAddress,
              role: "admin",
            });

            if (user && user.isAdmin()) {
              return user;
            } else {
              throw new AdminLogin();
            }
          } catch (error) {
            throw new InvalidLogin();
          }
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        // console.log("user", user);

        token.id = user._id;
        token.role = user.role;
        token.address = user.address;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      // console.log("token", token);

      session.user.id = token.id;
      session.user.role = token.role;
      session.user.address = token.address;
      return session;
    },
  },
});
