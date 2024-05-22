const { Entry } = require("./models");
const { addDays, subMonths } = require("date-fns");

const currentDate = new Date();
const oneMonthAgo = subMonths(new Date(), 1);
const twoMonthAgo = subMonths(new Date(), 2);

function generateProjects(userId) {
   return [
      {
         title: "Project A",
         startDate: twoMonthAgo,
         userId,
      },
      {
         title: "Project B",
         startDate: oneMonthAgo,
         userId,
      },
      {
         title: "Project C",
         startDate: currentDate,
         userId,
      },
   ];
}

function generateProjectsEntries(projectTitle, projectId, userId) {
   console.log();
   const entries = {
      "Project A": [
         new Entry({
            userId: userId,
            amount: 500,
            entryType: "income",
            category: "sales revenue",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 300,
            entryType: "expense",
            category: "consulting fees",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 700,
            entryType: "expense",
            category: "product",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 2500,
            entryType: "expense",
            category: "service",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 400,
            entryType: "income",
            category: "investment income",

            project: projectId,
         }),
      ],
      "Project B": [
         new Entry({
            userId: userId,
            amount: 500,
            entryType: "income",
            category: "sales revenue",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 500,
            entryType: "income",
            category: "sales revenue",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 300,
            entryType: "expense",
            category: "consulting fees",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 700,
            entryType: "expense",
            category: "product",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 2500,
            entryType: "income",
            category: "service revenue",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 400,
            entryType: "income",
            category: "investment income",

            project: projectId,
         }),
      ],
      "Project C": [
         new Entry({
            userId: userId,
            amount: 500,
            entryType: "income",
            category: "sales revenue",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 500,
            entryType: "income",
            category: "sales revenue",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 500,
            entryType: "expense",
            category: "sales",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 300,
            entryType: "expense",
            category: "consulting fees",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 700,
            entryType: "expense",
            category: "product",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 2500,
            entryType: "expense",
            category: "service",

            project: projectId,
         }),
         new Entry({
            userId: userId,
            amount: 400,
            entryType: "income",
            category: "investment income",

            project: projectId,
         }),
      ],
   };
   return entries[projectTitle];
}

function generateIncomes(userId) {
   return [
      {
         userId: userId,
         amount: 500,
         entryType: "income",
         category: "sales revenue",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 300,
         entryType: "income",
         category: "consulting fees",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 700,
         entryType: "income",
         category: "product revenue",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 2500,
         entryType: "income",
         category: "service revenue",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 400,
         entryType: "income",
         category: "investment income",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 600,
         entryType: "income",
         category: "royalties",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 3500,
         entryType: "income",
         category: "advertising revenue",
         date: twoMonthAgo,
      },

      {
         userId: userId,
         amount: 3500,
         entryType: "income",
         category: "advertising revenue",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 500,
         entryType: "income",
         category: "sales revenue",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 300,
         entryType: "income",
         category: "consulting fees",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 700,
         entryType: "income",
         category: "product revenue",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 2500,
         entryType: "income",
         category: "service revenue",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 400,
         entryType: "income",
         category: "investment income",
         date: oneMonthAgo,
      },

      {
         userId: userId,
         amount: 7500,
         entryType: "income",
         category: "contractual income",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 3200,
         entryType: "income",
         category: "subscription revenue",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 4800,
         entryType: "income",
         category: "donations",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 3800,
         entryType: "income",
         category: "licensing fees",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 4200,
         entryType: "income",
         category: "sponsorships",
         date: currentDate,
      },
   ];
}

function generateExpenses(userId) {
   return [
      {
         userId: userId,
         amount: 2500,
         entryType: "expense",
         category: "office supplies",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 1200,
         entryType: "expense",
         category: "marketing",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 3500,
         entryType: "expense",
         category: "travel expenses",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 800,
         entryType: "expense",
         category: "utilities",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 1750,
         entryType: "expense",
         category: "business meals",
         date: twoMonthAgo,
      },
      {
         userId: userId,
         amount: 200,
         entryType: "expense",
         category: "equipment",
         date: twoMonthAgo,
      },

      {
         userId: userId,
         amount: 2500,
         entryType: "expense",
         category: "office supplies",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 1200,
         entryType: "expense",
         category: "marketing",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 3500,
         entryType: "expense",
         category: "travel expenses",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 800,
         entryType: "expense",
         category: "utilities",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 1750,
         entryType: "expense",
         category: "business meals",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 2000,
         entryType: "expense",
         category: "equipment",
         date: oneMonthAgo,
      },
      {
         userId: userId,
         amount: 900,
         entryType: "expense",
         category: "advertising",
         date: oneMonthAgo,
      },

      {
         userId: userId,
         amount: 2500,
         entryType: "expense",
         category: "office supplies",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 1200,
         entryType: "expense",
         category: "marketing",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 3500,
         entryType: "expense",
         category: "travel expenses",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 800,
         entryType: "expense",
         category: "utilities",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 1750,
         entryType: "expense",
         category: "business meals",
         date: currentDate,
      },
      {
         userId: userId,
         amount: 2000,
         entryType: "expense",
         category: "equipment",
         date: currentDate,
      },
   ];
}

function generateRecurringExpenses(userId) {
   const today = currentDate;
   return [
      {
         userId,
         title: "Office Supplies",
         amount: 120,
         category: "office expenses",
         startDate: addDays(today, 1),
         nextOccurrence: addDays(today, 1),
      },
      {
         userId,
         title: "Internet Subscription",
         amount: 80,
         category: "utilities",
         startDate: addDays(today, 2),
         nextOccurrence: addDays(today, 2),
      },
      {
         userId,
         title: "Marketing Fees",
         amount: 350,
         category: "marketing",
         startDate: addDays(today, 3),
         nextOccurrence: addDays(today, 3),
      },
      {
         userId,
         title: "Rent",
         amount: 1500,
         category: "office expenses",
         startDate: addDays(today, 4),
         nextOccurrence: addDays(today, 4),
      },
      {
         userId,
         title: "Software Subscription",
         amount: 200,
         category: "software",
         startDate: addDays(today, 5),
         nextOccurrence: addDays(today, 5),
      },
   ];
}

module.exports = {
   generateProjects,
   generateProjectsEntries,
   generateIncomes,
   generateExpenses,
   generateRecurringExpenses,
};
