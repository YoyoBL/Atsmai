"use client";

import { AddNewEntry } from "@/actions";
import EntryDatesPicker from "@/components/new-entry/entryDatesPicker";
import { getToday } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";

import { YupNewEntrySchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";
import Categories from "./categories";
import RadioBtn from "../common/radioBtn";

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
         const res = await AddNewEntry(parsedValues);
         console.log(res);
      },
      validationSchema: YupNewEntrySchema(),
   });

   const color = formik.values.entryType === "income" ? "primary" : "secondary";
   const loadTwColors = {
      primary: "bg-primary input-primary",
      secondary: "bg-secondary input-secondary",
   };

   return (
      <form onSubmit={formik.handleSubmit}>
         <div className="flex flex-col gap-4">
            {/* income | expense */}

            <div className="flex gap-3">
               <RadioBtn
                  form={formik}
                  color={"primary"}
                  name={"entryType"}
                  value={"income"}
                  className="flex-1"
                  defaultChecked
               />
               <RadioBtn
                  form={formik}
                  color={"secondary"}
                  name={"entryType"}
                  value={"expense"}
                  className="flex-1"
               />
            </div>

            {/* Amount */}
            <input
               {...formik.getFieldProps("amount")}
               type="text"
               placeholder="Amount*"
               className={cn(`input input-bordered w-full input-${color}`, {
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
               color={color}
            />

            {/* category */}

            <Categories formik={formik} color={color} />

            <button
               className={`btn btn-${color} text-lg`}
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
