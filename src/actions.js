"use server";

import { cookies } from "next/headers";
import Income from "./models/income.model";
import dbConnect from "./lib/mongoDbConnect";

export async function AddNewEntry(entry) {
   try {
      await dbConnect();
      if (entry.entryType === "income") {
         const newEntry = new Income(entry);
         const savedEntry = await newEntry.save();
         return { ok: true, data: savedEntry };
      }
      console.log(values);
   } catch (error) {
      console.log(error);
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
      console.log(incomeCategories);
   } catch (error) {
      console.log(error);
   }
}

export async function switchThemeOnCookie(theme) {
   const cookiesStore = cookies();
   const cookie = cookiesStore.set(COOKIE_THEME_KEY, theme);
   return { status: "ok" };
}
