const dbConnect = require("./dbConnect");
const { Entry, Project, RecurringExpense, User } = require("./models");

const {
   generateExpenses,
   generateIncomes,
   generateProjects,
   generateProjectsEntries,
   generateRecurringExpenses,
} = require("./initialData");
const chalk = require("chalk");
const bcrypt = require("bcrypt");

async function seedInitialData() {
   const promises = [];

   try {
      await dbConnect();
      const check = await User.find({
         email: {
            $in: [
               "admin@gmail.com",
               "usernovat@gmail.com",
               "uservat@gmail.com",
            ],
         },
      });
      if (check.length) return console.log(chalk.cyan("Data already loaded"));
      const users = await createInitialUsers();
      for (let user of users) {
         const id = user._id;

         const res = addData(id);
         promises.push(res);
      }
      await Promise.allSettled(promises);
      const log = `
           admin: {
              email: ${users[0].email},
              password: Aa123456@,
           },
            userVAT: {
              email: ${users[2].email},
              password: Aa123456@,
           },
           userNoVAT: {
              email: ${users[1].email},
              password: Aa123456@,
           }`;
      console.log(chalk.green("Initial data seeded successfully."));
      console.log(chalk.green(log));
      return "Data Initialized, check console for details.";
   } catch (error) {
      console.log(error);
   }
}

async function addData(id) {
   try {
      const projects = generateProjects(id);
      const projectsPromise = AddProjects(projects);

      const expenses = generateExpenses(id);
      const expensesPromise = AddExpenses(expenses);

      const incomes = generateIncomes(id);
      const incomesPromise = AddIncomes(incomes);

      const recurrings = generateRecurringExpenses(id);
      const recurringsPromise = AddRecurringExpenses(recurrings);
      const promises = [
         projectsPromise,
         expensesPromise,
         incomesPromise,
         recurringsPromise,
      ];
      return promises;
   } catch (error) {
      console.log(error);
   }
}

async function createInitialUsers() {
   const users = {
      admin: {
         firstName: "Admin",
         lastName: "Administrator",
         email: "admin@gmail.com",
         password: "Aa123456@",
         role: "admin",
         country: "Israel",
         city: "TLV",
      },

      userVAT: {
         firstName: "User",
         lastName: "VAT",
         email: "userVAT@gmail.com",
         vat: true,
         password: "Aa123456@",
         country: "Israel",
         city: "TLV",
      },
      userNoVAT: {
         firstName: "User",
         lastName: "NoVAT",
         email: "userNoVAT@gmail.com",
         vat: false,
         password: "Aa123456@",
         country: "Israel",
         city: "TLV",
      },
   };
   const admin = await addNewUser(users.admin);
   const userNoVAT = await addNewUser(users.userNoVAT);
   const userVAT = await addNewUser(users.userVAT);
   return [admin.data, userNoVAT.data, userVAT.data];
}

async function AddProjects(projects) {
   const promises = [];
   const projectsObj = {};
   for (const project of projects) {
      projectsObj[project.title] = new Project(project);
      const projectId = projectsObj[project.title]._id;
      const userId = projectsObj[project.title].userId;
      const projectEntries = generateProjectsEntries(
         project.title,
         projectId,
         userId
      );

      const entriesId = projectEntries.map((entry) => entry._id);
      const totalIncomes = projectEntries
         .filter((entry) => entry.entryType === "income")
         .reduce((total, entry) => total + entry.amount, 0);
      const totalExpenses = projectEntries
         .filter((entry) => entry.entryType === "expense")
         .reduce((total, entry) => total + entry.amount, 0);

      for (const key in projectsObj) {
         const project = projectsObj[key];
         project.entries = entriesId;
         project.totalIncomes = totalIncomes;
         project.totalExpenses = totalExpenses;
      }
      await Entry.create(projectEntries);
      await projectsObj[project.title].save();
   }
}

async function AddIncomes(entries) {
   return Entry.create(entries);
}

async function AddExpenses(entries) {
   return Entry.create(entries);
}

async function AddRecurringExpenses(entries) {
   return RecurringExpense.create(entries);
}

async function addNewUser(values) {
   try {
      // check if user exists
      const email = values.email.toLowerCase();
      const exists = await User.findOne({ email });

      if (exists) throw new Error("Email already registered.");
      const hashedPassword = await bcrypt.hash(values.password, 12);
      const newUser = await User.create({
         ...values,
         email,
         password: hashedPassword,
      });
      const { firstName, lastName, _id } = newUser;
      return {
         ok: true,
         data: { firstName, lastName, email, _id: _id.toString() },
      };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

seedInitialData().catch(console.log);
