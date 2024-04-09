"use client";

import toast from "react-hot-toast";
import {
   AddNewEntry,
   editEntry,
   fetchEntryById,
} from "@/actions/entries.actions";
import EntryDatesPicker from "@/components/new-entry/entryDatesPicker";
import { getToday, formatDate } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";

import { YupNewEntrySchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";
import Categories from "./categories";
import RadioBtn from "../common/radioBtn";
import useQueryParams from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const NewEntryForm = ({ text }) => {
   const router = useRouter();
   const { lang } = useParams();

   const { getQueryByName } = useQueryParams();
   const [color, setColor] = useState("primary");

   const isEdit = getQueryByName("edit");

   const formik = useFormik({
      validateOnMount: true,

      initialValues: {
         entryType: "income",
         amount: "",
         date: getToday(),
         category: "general",
      },
      onSubmit: async (values) => {
         try {
            const parsedValues = await YupNewEntrySchema().validate(values);

            let res;
            if (!isEdit) {
               res = await AddNewEntry(parsedValues);
               if (!res.ok) return res.data;

               const entriesType =
                  values.entryType === "income" ? "incomes" : "expenses";
               const month = formatDate(values.date, "MM-yy");
               const path = `/${lang}/?entriesType=${entriesType}&month=${month}`;
               toast.success("Entry Created");
               router.replace(path);
            }
            if (isEdit) {
               const oldEntryData = {
                  id: getQueryByName("edit"),
                  entryType: getQueryByName("entryType"),
               };
               res = await editEntry(oldEntryData, parsedValues);
               res.ok = false;
               res.data = "Server error";
               if (!res.ok) return toast.error(`Server error`);
               toast.success("Entry Edited");

               router.back();
            }
         } catch (error) {
            console.log(error);
         }
      },
      validationSchema: YupNewEntrySchema(),
   });

   useEffect(() => {
      if (!isEdit) return;
      getEntry();
   }, [isEdit]);
   useEffect(() => {
      const updatedColor =
         formik.values.entryType === "income" ? "primary" : "secondary";
      setColor(updatedColor);
   }, [formik.values.entryType]);

   async function getEntry() {
      const id = getQueryByName("edit");
      const entrytype = getQueryByName("entryType");
      const res = await fetchEntryById(id, entrytype);
      if (!res.ok) return;
      const entry = res.data;
      entry.entryType = entrytype;
      formik.setValues(entry);
   }

   const colorCondition = formik.values.entryType === "income";

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
                  label={text.income}
                  className="flex-1"
                  defaultChecked
               />
               <RadioBtn
                  form={formik}
                  color={"secondary"}
                  name={"entryType"}
                  value={"expense"}
                  label={text.expense}
                  className="flex-1"
               />
            </div>

            {/* Amount */}
            <input
               {...formik.getFieldProps("amount")}
               type="text"
               placeholder={`${text.amount}*`}
               className={cn(
                  `input input-bordered w-full `,
                  colorCondition ? "input-primary" : "input-secondary",
                  {
                     "input-error placeholder:text-error":
                        formik.touched.amount && formik.errors.amount,
                  }
               )}
            />
            {formik.touched.amount && formik.errors.amount && (
               <div className="text-sm text-error text-opacity-80">
                  {formik.errors.amount}
               </div>
            )}

            {/* date */}
            <EntryDatesPicker
               handleDate={(date) => formik.setFieldValue("date", date)}
               form={formik.values}
               text={text}
               color={color}
            />

            {/* category */}

            <Categories form={formik} text={text} color={color} />

            <button
               className={`btn btn-${color} text-lg`}
               type="submit"
               disabled={!formik.values.amount || !formik.isValid}
            >
               {text.submit}
            </button>
         </div>
      </form>
   );
};

export default NewEntryForm;
