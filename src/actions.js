"use server";

import Income from "./models/income.model";
import Expense from "./models/expense.model";
import { cookies } from "next/headers";
import dbConnect from "./lib/mongoDbConnect";
import { getEndOfMonth, getStartOfMonth } from "./lib/dates";
import { parse } from "date-fns";
import { COOKIE_THEME_KEY } from "./constants";

function serialize(obj) {
   return JSON.parse(JSON.stringify(obj));
}

export async function AddNewEntry(entry) {
   let savedEntry = {};
   try {
      await dbConnect();
      if (entry.entryType === "income") {
         const newEntry = new Income(entry);
         savedEntry = await newEntry.save();
      } else {
         const newEntry = new Expense(entry);
         savedEntry = await newEntry.save();
      }
      savedEntry = serialize(savedEntry);

      return { ok: true, data: savedEntry };
   } catch (error) {
      console.log(error);
   }
}

export async function fetchEntries(entriesType, monthString) {
   let month = undefined;
   if (monthString) {
      month = parse(monthString, "MM-yy", new Date());
   }
   const fromDate = getStartOfMonth(month);
   const toDate = getEndOfMonth(month);
   try {
      if (entriesType === "incomes") return fetchIncomes(fromDate, toDate);
      if (entriesType === "expenses") return fetchExpenses(fromDate, toDate);
      return "Error: Wrong entriesType, use only -  incomes | expenses";
   } catch (error) {
      return error;
   }
}

export async function fetchIncomes(startDate, endDate) {
   try {
      await dbConnect();
      const incomes = await Income.find({
         date: { $gte: startDate, $lte: endDate },
      }).sort({ date: -1 });
      return incomes;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchExpenses(startDate, endDate) {
   try {
      await dbConnect();
      const expenses = await Expense.find({
         date: { $gte: startDate, $lte: endDate },
      }).sort({ date: -1 });
      return expenses;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchCategories(type = "incomes") {
   let categories = [];
   try {
      await dbConnect();
      if (type === "incomes") {
         categories = await Income.distinct("category");
      } else {
         categories = await Expense.distinct("category");
      }

      //put the general category first
      const index = categories.indexOf("general");
      if (index !== -1) {
         const removedItem = categories.splice(index, 1);
         categories.unshift(removedItem[0]);
      } else {
         categories.unshift("general");
      }
      return { ok: true, data: categories };
   } catch (error) {
      console.log(error);
      return { ok: false, data: null };
   }
}

export async function switchThemeOnCookie(theme) {
   const cookiesStore = cookies();
   cookiesStore.set(COOKIE_THEME_KEY, theme);
   return { status: "ok" };
}

export async function getTheme() {
   const cookiesStore = cookies();
   const theme = cookiesStore.get(COOKIE_THEME_KEY);
   return theme.value;
}
