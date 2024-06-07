/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      ng: ["NanumGothic", "sans-serif"],
      ngb: ["NanumGothicBold", "sans-serif"],
      ngeb: ["NanumGothicExtraBold", "sans-serif"],
      ngl: ["NanumGothicLight", "sans-serif"],
      fmr: ["FiraMonoRegular", "sans-serif"],
      fmb: ["FiraMonoBold", "sans-serif"],
      fmm: ["FiraMonoMedium", "sans-serif"],
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-2sm": {
          "@apply text-[0.8125rem] leading-[1.125rem]": "",
        },
        ".text-2xs": {
          "@apply text-[0.625rem] leading-[0.875rem]": "",
        },
        ".text-3xs": {
          "@apply text-[0.5rem] leading-[0.75rem]": "",
        },
        ".text-4xs": {
          "@apply text-[0.475rem] leading-[0.675rem]": "",
        },
      });
    },
  ],
};
