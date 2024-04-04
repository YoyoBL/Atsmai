"use client";

import {
   AddNewEntry,
   editEntry,
   fetchEntryById,
} from "@/actions/entries.actions";
import EntryDatesPicker from "@/components/new-entry/entryDatesPicker";
import { getToday } from "@/lib/dates";
import cn from "@/lib/tailwindMerge";

import { YupNewEntrySchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";
import Categories from "./categories";
import RadioBtn from "../common/radioBtn";
import useQueryParams from "@/hooks/useQueryParams";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const NewEntryForm = () => {
   const router = useRouter();
   const { lang } = useParams();

   const { getQueryByName } = useQueryParams();
   const isEdit = getQueryByName("edit");

   useEffect(() => {
      if (!isEdit) return;
      getEntry();
   }, []);

   async function getEntry() {
      const id = getQueryByName("edit");
      const entrytype = getQueryByName("entryType");
      const res = await fetchEntryById(id, entrytype);
      if (!res.ok) return;
      const entry = res.data;
      entry.entryType = entrytype;
      formik.setValues(entry);
   }

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
            }
            if (isEdit) {
               const oldEntryData = {
                  id: getQueryByName("edit"),
                  entryType: getQueryByName("entryType"),
               };
               res = await editEntry(oldEntryData, parsedValues);
            }
            console.log(res);
            if (!res.ok) return res.data;

            router.back();
            router.refresh();
         } catch (error) {
            console.log(error);
         }
      },
      validationSchema: YupNewEntrySchema(),
   });

   const color = formik.values.entryType === "income" ? "primary" : "secondary";
   const loadTwColors = {
      primary: "bg-primary input-primary btn-primary",
      secondary: "bg-secondary input-secondary btn-secondary",
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
