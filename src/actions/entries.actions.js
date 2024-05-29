"use server";

import dbConnect, { serialize } from "../lib/mongoDbConnect";
import { getEndOfMonth, getStartOfMonth } from "../lib/dates";
import { parse, month, format, sub, subMonths, addMonths } from "date-fns";
import { revalidatePath } from "next/cache";
import { getUserId } from "../lib/userTools";
import Entry from "@/models/entry.model";
import { syncProject, updateProject } from "./project.actions";
import { VAT_PERCENTAGE } from "@/constants";

export async function AddNewEntry(entry) {
   const userId = await getUserId();
   try {
      await dbConnect();
      let data;
      const newEntry = new Entry({ ...entry, userId });
      if (entry.project) {
         const updatedProject = await updateProject(null, newEntry, "link");
         const result = await Promise.allSettled([
            newEntry.save(),
            updatedProject,
         ]);
         data = { newEntry: result[0].value, updatedProject: result[1].value };
      } else {
         data = await newEntry.save();
      }

      data = serialize(data);
      revalidatePath("/[lang]/", "page");
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchEntryById(id) {
   try {
      await dbConnect();
      const entry = await Entry.findById(id);
      const data = serialize(entry);

      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: serialize(error) };
   }
}

export async function fetchEntries(entriesType, monthString) {
   const entryType = entriesType === "incomes" ? "income" : "expense";
   let month = undefined;
   if (monthString) {
      month = parse(monthString, "MM-yy", new Date());
   }
   const fromDate = getStartOfMonth(month);
   const toDate = getEndOfMonth(month);
   try {
      await dbConnect();
      const userId = await getUserId();

      const entries = await Entry.find({
         userId,
         entryType,
         date: { $gte: fromDate, $lt: toDate },
      }).sort({ date: -1 });

      const data = serialize(entries);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchCategories(type = "incomes") {
   let categories = [];
   try {
      await dbConnect();
      const userId = await getUserId();
      const filter =
         type === "incomes"
            ? { entryType: "income" }
            : { entryType: "expense" };
      categories = await Entry.distinct("category", { ...filter, userId });

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
   const userId = await getUserId();
   try {
      await dbConnect();
      const lastThreeIncomes = await Entry.find({
         entryType,
         userId,
         category,
      })
         .limit(3)
         .sort({ date: -1 });
      return serialize(lastThreeIncomes);
   } catch (error) {
      console.log(error);
   }
}

export async function editEntry(id, updatedData) {
   if (!id) throw new Error("Id not provided.");
   try {
      await dbConnect();
      const oldEntry = await Entry.findByIdAndUpdate(id, updatedData);
      await updateProjectAfterEdit(oldEntry, updatedData);

      revalidatePath("/[lang]/", "page");
      const data = serialize(oldEntry);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

async function updateProjectAfterEdit(oldEntry, updatedData) {
   let action;
   if (oldEntry.entryType !== updatedData.entryType) {
      action = "typeEdit";
   }
   if (oldEntry.amount !== updatedData.amount) {
      action = "amountChange";
   }
   if (!oldEntry?.project && updatedData.project) {
      action = "link";
   }
   if (oldEntry?.project && !updatedData.project) {
      action = "unlink";
   }
   if (!action) return null;
   return await updateProject(oldEntry, updatedData, action);
}

export async function deleteEntry(entry) {
   if (!entry) return "No entry Provided";
   const { _id: id } = entry;
   try {
      await dbConnect();
      const deletedEntry = await Entry.findByIdAndDelete(id);

      if (!deleteEntry) throw new Error("Entry to delete not found.");
      revalidatePath("/[lang]/", "page");
      return { ok: true, data: serialize(deletedEntry) };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error };
   }
}

export async function searchEntries(entryType, searchValue) {
   searchValue = searchValue.toLowerCase();
   entryType = entryType === "incomes" ? "income" : "expense";
   try {
      await dbConnect();
      const userId = await getUserId();
      const res = await Entry.find({
         entryType,
         userId,
         category: { $regex: searchValue, $options: "i" },
      });
      if (!res.length) return { ok: true, data: ["Nothing Found"] };
      const data = serialize(res);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchTaxesEntries() {
   const userId = await getUserId();
   const currentDate = new Date();
   let from;
   let to;
   let query = { userId, entryType: "income", vatExempted: { $ne: true } };
   const monthNum = format(currentDate, "M");
   //if paired month
   if (monthNum % 2 === 0) {
      from = getStartOfMonth(subMonths(currentDate, 1));
      to = getEndOfMonth(currentDate);
      query = { ...query, date: { $gte: from, $lte: to } };
   } else {
      //if unpaired month
      from = getStartOfMonth(currentDate);
      to = getEndOfMonth(addMonths(currentDate, 1));

      query = { ...query, date: { $gte: from, $lte: to } };
   }
   try {
      await dbConnect();
      const res = await Entry.find(query);
      const months = [format(from, "MMMM"), format(to, "MMMM")];

      return { ok: true, data: { months, entries: res } };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
