"use client";

import { AddNewEntry } from "@/actions";
import EntryDatesPicker from "@/components/new-entry/entryDatesPicker";
import { getToday } from "@/lib/date";
import cn from "@/lib/tailwindMerge";

import { YupNewEntrySchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";
import Categories from "./categories";

const NewEntryForm = () => {
   const formik = useFormik({
      validateOnMount: true,

      initialValues: {
         entryType: "income",
         amount: "",
         date: getToday(),
         category: "general",
      },
      onSubmit: async (values) => {
         const parsedValues = await YupNewEntrySchema().validate(values);
         const res = await AddNewEntry(values);
         console.log(res);
      },
      validationSchema: YupNewEntrySchema(),
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <div className="flex flex-col gap-4">
            {/* income | expense */}
            <div className="flex gap-3">
               <input
                  type="radio"
                  name="entryType"
                  aria-label="Income"
                  className="bg-base-100 btn btn-ghost grow checked:btn-primary"
                  value="income"
                  onChange={formik.handleChange}
                  defaultChecked
               />
               <input
                  type="radio"
                  name="entryType"
                  aria-label="Expense"
                  className="bg-base-100 btn btn-ghost grow checked:btn-primary"
                  value="expense"
                  onChange={formik.handleChange}
               />
            </div>

            {/* Amount */}
            <input
               {...formik.getFieldProps("amount")}
               type="text"
               placeholder="Amount*"
               className={cn("input input-bordered input-primary w-full", {
                  "input-error placeholder:text-error":
                     formik.touched.amount && formik.errors.amount,
               })}
            />
            {formik.touched.amount && formik.errors.amount && (
               <div className="text-sm text-error text-opacity-80">
                  {formik.errors.amount}
               </div>
            )}

            {/* date */}
            <EntryDatesPicker
               handleDate={(date) => formik.setFieldValue("date", date)}
               state={formik.values.date}
            />

            {/* category */}

            <Categories formik={formik} />

            <button
               className="btn btn-primary text-lg"
               type="submit"
               disabled={!formik.values.amount || !formik.isValid}
            >
               Submit
            </button>
         </div>
      </form>
   );
};

export default NewEntryForm;
