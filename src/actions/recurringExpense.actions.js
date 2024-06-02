"use server";

import dbConnect, { serialize } from "@/lib/mongoDbConnect";
import { getUserId } from "@/lib/userTools";
import LastRecurringCheck from "@/models/lastRecurringCheck.model";
import RecurringExpense from "@/models/recurringExpense.model";
import { addDays, addMonths, isAfter, startOfToday } from "date-fns";
import { revalidatePath } from "next/cache";
import { AddNewEntry } from "./entries.actions";
import { YupNewRecurringSchema } from "@/lib/yupSchemas";

export async function getRecurringExpenses() {
   const userId = await getUserId();
   try {
      await dbConnect();

      const recurringExpensesPromise = RecurringExpense.find({ userId }).sort({
         nextOccurrence: 1,
      });
      const lastCheckPromise = LastRecurringCheck.find({ userId });
      const results = await Promise.allSettled([
         recurringExpensesPromise,
         lastCheckPromise,
      ]);
      const recurringExpenses = results[0]?.value;

      //check if needs to auto add recurring expenses
      const lastCheck = results[1]?.value[0]?.lastCheck;
      const isChecked = addDays(lastCheck, 1) > startOfToday();
      if (!isChecked) autoAdd(recurringExpenses);

      const data = serialize(recurringExpenses);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function autoAdd(recurring) {
   const userId = await getUserId();
   const promises = [];

   const currentDate = new Date();
   recurring.forEach((v) => {
      if (isAfter(currentDate, v.nextOccurrence)) {
         const newExpense = {
            amount: v.amount,
            category: v.category,
            date: v.nextOccurrence,
            entryType: "expense",
            userId,
         };
         const ExpensePromise = AddNewEntry(newExpense);
         const updatedNextOccurrence = addMonths(v.nextOccurrence, 1);

         const recurringUpdate = RecurringExpense.findByIdAndUpdate(v._id, {
            nextOccurrence: updatedNextOccurrence,
         });
         promises.push(ExpensePromise, recurringUpdate);
      }
   });
   const lastCheck = updateLastCheck(userId);

   const results = await Promise.allSettled([...promises, lastCheck]);

   revalidatePath("/[lang]/", "page");
   return results;
}

async function updateLastCheck(userId) {
   const { _id } = LastRecurringCheck.find({ userId });
   //if no last check create
   if (!_id)
      return LastRecurringCheck.create({ lastCheck: startOfToday(), userId });

   //if exists update
   return LastRecurringCheck.findByIdAndUpdate(_id, {
      lastCheck: startOfToday(),
   });
}

export async function resetLastCheck() {
   const userId = await getUserId();
   try {
      await dbConnect();
      const deleted = await LastRecurringCheck.findOneAndDelete({ userId });
      return { ok: true };
   } catch (error) {
      console.log(error);
      return { ok: false, date: error.message };
   }
}

export async function addNewRecurringExpense(formValues) {
   try {
      const userId = await getUserId();
      formValues = await YupNewRecurringSchema().validate(formValues);
      await dbConnect();

      const nextOccurrence = formValues.startDate;

      const newDocument = new RecurringExpense({
         ...formValues,
         nextOccurrence,
         userId,
      });
      await newDocument.save();
      const serializedDocument = serialize(newDocument);
      revalidatePath("/[lang]/recurring-expenses", "page");

      return {
         ok: true,
         data: serializedDocument,
      };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function fetchRecurringExpenseById(id) {
   try {
      await dbConnect();
      const document = await RecurringExpense.findById(id);
      if (!document) throw new Error("Recurring expense id doesn't exist");
      const data = serialize(document);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: true, data };
   }
}

export async function editRecurringExpense(updatedValues, id) {
   try {
      updatedValues = await YupNewRecurringSchema().validate(updatedValues);
      await dbConnect();

      const updated = await RecurringExpense.findByIdAndUpdate(
         id,
         updatedValues,
         { new: true }
      );
      const data = serialize(updated);
      revalidatePath("/[lang]/recurring-expenses", "page");

      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function deleteRecurringExpense(id) {
   try {
      await dbConnect();
      const deleted = await RecurringExpense.findByIdAndDelete(id);
      if (!deleted) return { ok: false, data: "Entry to delete not found" };
      const data = serialize(deleted);
      revalidatePath("/[lang]/recurring-expenses", "page");

      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
