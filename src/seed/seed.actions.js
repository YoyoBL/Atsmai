// "use server";
// import dbConnect from "@/lib/mongoDbConnect";
// import "server-only";
// import { addNewUser } from "../actions/users.actions";

// import RecurringExpense from "@/models/recurringExpense.model";
// import {
//    generateExpenses,
//    generateIncomes,
//    generateRecurringExpenses,
// } from "@/seed/initialData";
// import chalk from "chalk";
// import User from "@/models/user.model";

// export async function seedInitialData() {
//    const promises = [];

//    try {
//       await dbConnect();
//       const check = await User.find({ email: "admin@gmail.com" });
//       if (check.length) return "Data already loaded";
//       const users = await createInitialUsers();

//       for (let user of users) {
//          const id = user._id;
//          const res = addData(id);
//          promises.push(res);
//       }
//       await Promise.allSettled(promises);
//       const log = `
//          admin: {
//             email: "admin@gmail.com",
//             password: "Aa123456@",
//          },
//          user: {
//             email: "user@gmail.com",
//             password: "Aa123456@",
//          }`;
//       console.log(chalk.bgGreen("Initial data seeded successfully."));
//       console.log(chalk.bgGrey(log));
//       return "Data Initialized, check console for details.";
//    } catch (error) {
//       console.log(error);
//    }
// }

// async function addData(id) {
//    try {
//       const expenses = generateExpenses(id);
//       const expensesPromise = AddExpenses(expenses);

//       const incomes = generateIncomes(id);
//       const incomesPromise = AddIncomes(incomes);

//       const recurrings = generateRecurringExpenses(id);
//       const recurringsPromise = AddRecurringExpenses(recurrings);
//       const promises = [expensesPromise, incomesPromise, recurringsPromise];
//       return promises;
//    } catch (error) {
//       console.log(error);
//    }
// }

// async function createInitialUsers() {
//    const users = {
//       admin: {
//          firstName: "Admin",
//          lastName: "Administrator",
//          email: "admin@gmail.com",
//          password: "Aa123456@",
//          role: "admin",
//          country: "Israel",
//          city: "TLV",
//       },
//       user: {
//          firstName: "User",
//          lastName: "Userstein",
//          email: "user@gmail.com",
//          password: "Aa123456@",
//          role: "User",
//          country: "Israel",
//          city: "TLV",
//       },
//    };
//    const admin = await addNewUser(users.admin);
//    const user = await addNewUser(users.user);
//    return [admin.data, user.data];
// }

// async function AddIncomes(entries) {
//    return Income.create(entries);
// }

// async function AddExpenses(entries) {
//    return Expense.create(entries);
// }

// async function AddRecurringExpenses(entries) {
//    return RecurringExpense.create(entries);
// }
