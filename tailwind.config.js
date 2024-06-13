export const PRIMARY_COLOR = "#077ADB";
export const SECONDARY_COLOR = "#D27518";

/** @type {import('tailwindcss').Config} */
export const content = [
   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
   "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
   extend: {},
};
export const plugins = [require("daisyui")];
export const daisyui = {
   logs: false,
   themes: [
      {
         light: {
            ...require("daisyui/src/theming/themes")["light"],
            primary: PRIMARY_COLOR,
            secondary: SECONDARY_COLOR,
            neutral: "#878787",
         },
         dark: {
            ...require("daisyui/src/theming/themes")["dark"],
            primary: PRIMARY_COLOR,
            secondary: SECONDARY_COLOR,
         },
      },
   ],
};
