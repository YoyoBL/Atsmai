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
import LinkToProject from "./linkToProject";
import LoadingEntry from "../entries/loadinfEntry";
import { useSession } from "next-auth/react";

const NewEntryForm = ({ text }) => {
   const router = useRouter();
   const { lang } = useParams();
   const session = useSession();
   const isVAT = session?.data?.user?.vat;

   const { getQueryByName } = useQueryParams();
   const [color, setColor] = useState("primary");

   const isEdit = getQueryByName("edit");

   const formik = useFormik({
      validateOnMount: true,

      initialValues: {
         entryType: "income",
         amount: "",
         vatExempted: false,
         date: getToday(),
         category: "general",
         project: null,
      },
      onSubmit: async (values) => {
         try {
            const parsedValues = await YupNewEntrySchema().validate(values);
            let res;
            const entriesType =
               values.entryType === "income" ? "incomes" : "expenses";
            const month = formatDate(values.date, "MM-yy");
            let redirect = `/${lang}/?entriesType=${entriesType}&month=${month}`;

            if (!isEdit) {
               res = await AddNewEntry(parsedValues);
               if (!res.ok) return res.data;
               toast.success("Entry Created");
            }
            if (isEdit) {

               const id = getQueryByName("edit");
               res = await editEntry(id, parsedValues);




               if (!res.ok) return toast.error(`Server error`);
               toast.success("Entry Edited");

               redirect = redirect + `&modal=${res.data._id}`;
            }
            router.replace(redirect);
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

   // if edit don't load ui until data is fetched
   if (isEdit && !formik.values.amount) return <LoadingEntry />;

   async function getEntry() {
      const id = getQueryByName("edit");
      const res = await fetchEntryById(id);
      if (!res.ok) return;
      const entry = res.data;
      formik.setValues(entry);
   }

   const isIncome = formik.values.entryType === "income";

   return (
      <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                  checked={formik.values.entryType === "income"}
               />
               <RadioBtn
                  form={formik}
                  color={"secondary"}
                  name={"entryType"}
                  value={"expense"}
                  label={text.expense}
                  className="flex-1"
                  checked={formik.values.entryType === "expense"}
               />
            </div>

            {/* Amount */}
            <div>
               <input
                  {...formik.getFieldProps("amount")}
                  type="text"
                  placeholder={`${text.amount}*`}
                  className={cn(
                     `input input-bordered w-full `,
                     isIncome ? "input-primary" : "input-secondary",
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
               {/* no VAT */}
               {isVAT && isIncome && (
                  <div className="form-control">
                     <label className="label justify-end gap-2 cursor-pointer">
                        <input
                           type="checkbox"
                           className="checkbox checkbox-sm checked:checkbox-primary"
                           onChange={() =>
                              formik.setFieldValue("vat", !formik.values.vat)
                           }
                        />
                        <span className="label-text text-sm">{text.vat}</span>
                     </label>
                  </div>
               )}
            </div>

            {/* date */}
            <EntryDatesPicker
               handleDate={(date) => formik.setFieldValue("date", date)}
               form={formik.values}
               text={text}
               color={color}
            />

            {/* category */}

            <Categories form={formik} text={text} color={color} />

            {/* link to project */}
            <LinkToProject form={formik} color={color} text={text} />

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
