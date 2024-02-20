"use client";

import { AddNewEntry } from "@/actions";
import EntryDatesPicker from "@/components/entryDatesPicker";
import { getToday } from "@/lib/date";
import cn from "@/lib/tailwindMerge";

import { YupNewEntrySchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";

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
         <div className="flex flex-col gap-4 max-w-md">
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

            <label className="form-control w-full">
               <div className="label">
                  <span className="label-text">Category</span>
               </div>
               <input
                  {...formik.getFieldProps("category")}
                  type="text"
                  placeholder="New Category"
                  className="input input-bordered input-primary w-full"
               />
            </label>

            <div className="card bg-base-300">
               <div className="flex gap-2 p-2 flex-row flex-nowrap overflow-x-scroll max-w-sm">
                  {[
                     "general",
                     "employees",
                     "provider",
                     "food",
                     "rent",
                     "this",
                     "that",
                  ].map((category) => (
                     <input
                        key={category}
                        type="radio"
                        name="category"
                        aria-label={category}
                        className="bg-base-100 btn btn-sm  btn-ghost font-light checked:btn-primary capitalize"
                        value={category}
                        onChange={formik.handleChange}
                        defaultChecked={category === "general"}
                     />
                  ))}
               </div>
            </div>

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
