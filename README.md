# Yoel Bar-Lev's Atsmai Expense Tracker App

## Details

-  **Name:** Yoel Bar-Lev
-  **Email:** yoelbl2@gmail.com
-  **Production Deployment:** [atsmai.onrender.com/he/welcome](https://atsmai.onrender.com/he/welcome)

## Instructions

1. rename the `.env.example` file to `.env`, then fill in the required variables.
2. Run `npm run build`.
3. Run `npm run seed` to seed initial data.
4. Run `npm run start`.
5. Navigate to localhost

## Key Features

-  Light and Dark themes (stored in cookie)
-  Full Hebrew and English language and layout support
-  Full mobile/PC compatibility
-  All data stored in the cloud (MongoDB)
-  Choose to register as a licensed or Exempted business, This will be relevant to the VAT calculations
-  Add incomes and expenses with the cross-page + button
-  A list of all your entries, sorted by month, with the total of each month conveniently displayed on top
-  Click on an entry and see the last 3 appearances of the same entry
-  Add recurring expenses; Atsmai will add them for you automatically when the time comes
-  Upcoming expenses (from recurring expenses) displayed on the expenses entries page under "Future Expenses"
-  Create projects and link entries to them, for tracking a specific group of entries
-  Set project as \"inactive\", This way it wont be suggested for future entries
-  Search and display entries
-  Profile page with edit option
-  Insights page with insights on the entries - under development
-  Admin CRM page

## Technologies Used

-  bcrypt
-  chalk
-  chart.js
-  client-only
-  clsx
-  date-fns
-  formik
-  framer-motion
-  jsonwebtoken
-  mongoose
-  next
-  next-auth
-  react
-  react-chartjs
-  react-dom
-  react-hot
-  react-icons
-  server-only
-  tailwind-merge
-  yup
-  autoprefixer
-  daisyui
-  tailwindcss
