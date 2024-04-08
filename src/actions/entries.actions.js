"use server";

import Income from "../models/income.model";
import Expense from "../models/expense.model";
import dbConnect, { serialize } from "../lib/mongoDbConnect";
import { getEndOfMonth, getStartOfMonth } from "../lib/dates";
import { parse } from "date-fns";
import { revalidatePath } from "next/cache";
import { getUserId } from "../lib/userTools";

export async function AddNewEntry(entry) {
   const userId = await getUserId();
   let savedEntry;
   let newEntry;
   try {
      await dbConnect();
      if (entry.entryType === "income") {
         newEntry = new Income({ ...entry, userId });
         savedEntry = await newEntry.save();
      } else {
         newEntry = new Expense({ ...entry, userId });
         savedEntry = await newEntry.save();
      }
      savedEntry = serialize(savedEntry);
      revalidatePath("/[lang]/", "page");
      return { ok: true, data: savedEntry };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchEntryById(id, entryType) {
   try {
      await dbConnect();
      let data;
      if (entryType === "income") data = await Income.findById(id);
      if (entryType === "expense") data = await Expense.findById(id);
      return { ok: true, data: serialize(data) };
   } catch (error) {
      console.log(error);
      return { ok: false, data: serialize(error) };
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
      const userId = await getUserId();

      const incomes = await Income.find({
         userId,
         date: { $gte: startDate, $lte: endDate },
      }).sort({ date: -1 });
      return serialize(incomes);
   } catch (error) {
      console.log(error);
   }
}

export async function fetchExpenses(startDate, endDate) {
   try {
      await dbConnect();
      const userId = await getUserId();

      const expenses = await Expense.find({
         userId,
         date: { $gte: startDate, $lte: endDate },
      }).sort({ date: -1 });
      return serialize(expenses);
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

export async function fetchThreeLast(entry) {
   if (!entry) return "No entry provided";
   const { category, entryType } = entry;
   try {
      await dbConnect();
      if (entryType.startsWith("income")) {
         const lastThreeIncomes = await Income.find({
            category: category,
         })
            .limit(3)
            .sort({ date: -1 });
         return serialize(lastThreeIncomes);
      }
      if (entryType.startsWith("expense")) {
         const lastThreeIncomes = await Expense.find({
            category: category,
         })
            .limit(3)
            .sort({ date: -1 });
         return serialize(lastThreeIncomes);
      }
      return "entryType not specified";
   } catch (error) {
      console.log(error);
   }
}

export async function editEntry(entry, updatedEntry) {
   if (!entry || !updatedEntry) return "No entry/updatedEntry Provided";
   const { id, entryType } = entry;
   let data;
   try {
      await dbConnect();
      if (entryType === "income") {
         // in case the user changes the entry form income to expense
         if (entryType !== updatedEntry.entryType) {
            const deleteEntry = Income.findByIdAndDelete(id);
            const newEntry = Expense.create(updatedEntry);
            data = await Promise.allSettled([deleteEntry, newEntry]);
         } else {
            data = await Income.findByIdAndUpdate(id, updatedEntry, {
               new: true,
            });
         }
         return { ok: true, data: serialize(data) };
      }
      if (entryType === "expense") {
         // in case the user changes the entry form expense to income
         if (entryType !== updatedEntry.entryType) {
            const deleteEntry = Expense.findByIdAndDelete(id);
            const newEntry = Income.create(updatedEntry);
            data = await Promise.allSettled([deleteEntry, newEntry]);
         } else {
            data = await Expense.findByIdAndUpdate(id, updatedEntry, {
               new: true,
            });
         }
         revalidatePath("/[lang]/", "page");

         return { ok: true, data: serialize(data) };
      }
   } catch (error) {
      console.log(error);
      return { ok: false, data: error };
   }
}

export async function deleteEntry(entry) {
   if (!entry) return "No entry Provided";
   const { _id: id, entryType } = entry;
   let deletedEntry;
   try {
      await dbConnect();
      if (entryType.startsWith("income")) {
         deletedEntry = await Income.findByIdAndDelete(id);
      }
      if (entryType.startsWith("expense")) {
         deletedEntry = await Expense.findByIdAndDelete(id);
      }
      if (!deleteEntry.length) throw new Error("Entry to delete not found.");
      revalidatePath("/[lang]/", "page");
      return { ok: true, data: serialize(deletedEntry) };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error };
   }
}

export async function searchEntries(entryType, searchValue) {
   const searchByType = {
      incomes: async (id) =>
         await Income.find({
            userId: id,
            category: { $regex: searchValue, $options: "i" },
         }),
      expenses: async (id) =>
         await Expense.find({
            userId: id,
            category: { $regex: searchValue, $options: "i" },
         }),
   };

   try {
      await dbConnect();
      const userId = await getUserId();
      const res = await searchByType[entryType](userId);
      if (!res.length) return { ok: true, data: ["Nothing Found"] };
      const data = serialize(res);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
