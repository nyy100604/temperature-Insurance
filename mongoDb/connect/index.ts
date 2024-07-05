// import mongoose from "mongoose";

// export const mongodbConnect = () => {
//   mongoose
//     .connect(process.env.MONGODB as string)
//     .then((msg) => {
//       console.log("connect to mongodb successfully");
//     })
//     .catch((e) => {
//       console.log("cannot connect to mongodb");
//     });
// };
import mongoose from "mongoose";

// 获取环境变量中的 MongoDB 连接 URI
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// 创建一个缓存对象以保持数据库连接的状态
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// 添加类型声明以支持全局变量
declare global {
  var mongoose: MongooseCache;
}

// 使用类型断言来初始化全局缓存对象
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const mongodbConnect = async () => {
  // 如果已经有连接，直接返回缓存的连接
  if (cached.conn) {
    return cached.conn;
  }

  // 如果没有连接，但有连接的 promise，等待该 promise 完成
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  // 等待连接完成并将连接保存到缓存中
  cached.conn = await cached.promise;
  return cached.conn;
};
