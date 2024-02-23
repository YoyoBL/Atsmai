"use server";

import { cookies } from "next/headers";
import Income from "./models/income.model";
import dbConnect from "./lib/mongoDbConnect";
import { getEndOfMonth, getStartOfMonth } from "./lib/dates";
import { parse } from "date-fns";

export async function AddNewEntry(entry) {
   try {
      await dbConnect();
      if (entry.entryType === "income") {
         const newEntry = new Income(entry);
         const savedEntry = await newEntry.save();
         return { ok: true, data: savedEntry };
      }
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
      if (entriesType === "expenses") return "Not defined yet";
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

export async function fetchCategories() {
   try {
      await dbConnect();
      const incomeCategories = await Income.distinct("category");

      //put the general category first
      const index = incomeCategories.indexOf("general");
      console.log(index);
      const removedItem = incomeCategories.splice(index, 1);
      incomeCategories.unshift(removedItem[0]);
      return { ok: true, data: incomeCategories };
   } catch (error) {
      console.log(error);
      return { ok: false, data: null };
   }
}

export async function switchThemeOnCookie(theme) {
   const cookiesStore = cookies();
   const cookie = cookiesStore.set(COOKIE_THEME_KEY, theme);
   return { status: "ok" };
}
