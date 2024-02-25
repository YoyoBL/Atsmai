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
               secondary: "#DB8A06",
            },
            dark: {
               ...require("daisyui/src/theming/themes")["dark"],
               primary: "#077ADB",
               secondary: "#DB8A06",
            },
         },
      ],
   },
};
