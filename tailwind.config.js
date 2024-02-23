/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {},
   },
   plugins: [require("daisyui")],
   daisyui: {
      themes: [
         {
            light: {
               ...require("daisyui/src/theming/themes")["light"],
               primary: "#077ADB",
               secondary: "#7dd3fc",
               ".btn-secondary": {
                  color: "black",
               },
               ".btn-primary": {
                  color: "white",
               },
            },
            dark: {
               ...require("daisyui/src/theming/themes")["dark"],
               primary: "#077ADB",
               secondary: "#7dd3fc",
               ".btn-primary": {
                  color: "black",
               },
            },
         },
      ],
   },
};
