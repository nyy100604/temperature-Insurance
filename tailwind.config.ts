import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    backgroundImage: {
      heroDesktop: "url(/Home/heroDesktop.png)",
      heroMobile: "url(/Home/heroMobile.png)",
      websiteFunction: "url(/Home/websitefunction.png)",
      policyManagementDesktop: "url(/Policy-manage/policyManageDesktop.png)",
      policyManagementMobile: "url(/Policy-manage/policyManageMobile.png)",
      policyCreateDesktop: "url(/Policy-create/policyCreateDesktop.png)",
      policyCreateMobile: "url(/Policy-create/policyCreateMobile.png)",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
