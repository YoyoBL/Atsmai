# Yoel Bar-Lev's Atsmai Expense Tracker App

## Details

-  **Name:** Yoel Bar-Lev
-  **Email:** yoelbl2@gmail.com

## Instructions

1. Duplicate the `.env.example` file to `.env.developer.local`, then fill in the required variables. For production create a `.env.local` file.
2. Run `npm run dev`.
3. Navigate to your localhost; you'll see a "Click here to seed initial data" button. Click it, and the initial data will be loaded. Check the console for the user's accounts.

## Key Features

-  Light and Dark themes (stored in cookie)
-  Full Hebrew and English language and layout support
-  Full mobile/PC compatibility
-  All data stored in the cloud (MongoDB)
-  Add incomes and expenses with the cross-page + button
-  A list of all your entries, sorted by month, with the total of each month conveniently displayed on top
-  Click on an entry and see the last 3 appearances of the same entry
-  Add recurring expenses; Atsmai will add them for you automatically when the time comes
-  Upcoming expenses (from recurring expenses) displayed in the expenses entries page
-  Search and display entries
-  Profile page with edit option
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
