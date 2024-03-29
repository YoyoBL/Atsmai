"use server";

import dbConnect, { serialize } from "@/lib/mongoDbConnect";
import RecurringExpense from "@/models/recurringExpense.model";
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

      const newDocument = new RecurringExpense(formValues);
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
