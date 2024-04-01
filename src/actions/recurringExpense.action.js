"use server";

import dbConnect, { serialize } from "@/lib/mongoDbConnect";
import RecurringExpense from "@/models/recurringExpense.model";
import { addMonths } from "date-fns";
import { revalidatePath } from "next/cache";

export async function getRecurringExpenses() {
   try {
      await dbConnect();
      const recurringExpenses = await RecurringExpense.find({});
      const data = serialize(recurringExpenses);
      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}

export async function addNewRecurringExpense(formValues) {
   try {
      await dbConnect();
      const isFuture = formValues.startDate > new Date();
      const nextOccurrence = isFuture
         ? formValues.startDate
         : addMonths(formValues.startDate, 1);
      const newDocument = new RecurringExpense({
         ...formValues,
         nextOccurrence,
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
      const data = serialize(deleted);
      revalidatePath("/[lang]/recurring-expenses", "page");

      return { ok: true, data };
   } catch (error) {
      console.log(error);
      return { ok: false, data: error.message };
   }
}
