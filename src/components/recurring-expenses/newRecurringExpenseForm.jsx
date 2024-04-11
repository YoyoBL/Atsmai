"use client";

import toast from "react-hot-toast";

import {
   addNewRecurringExpense,
   editRecurringExpense,
   fetchRecurringExpenseById,
   resetLastCheck,
} from "@/actions/recurringExpense.actions";
import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import { YupNewRecurringSchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isToday } from "date-fns";

const NewRecurringExpense = ({ text }) => {
   const { getQueryByName } = useQueryParams();
   const isEdit = getQueryByName("modal") !== "show";
   const params = useParams();
   const router = useRouter();

   useEffect(() => {
      if (!isEdit) return;
      const id = getQueryByName("modal");
      fetchRecurringExpense(id);
   }, [isEdit]);

   const inputFields = [
      { key: "title", title: text.title, inputType: "text", defaultValue: "" },
      {
         key: "amount",
         title: text.amount,
         inputType: "text",
         defaultValue: "",
      },
      {
         key: "category",
         title: text.category,
         inputType: "text",
         defaultValue: "",
      },
      {
         key: "startDate",
         title: text.startDate,
         inputType: "date",
         min: formatDate(new Date(), "yyyy-MM-dd"),
         defaultValue: "",
      },
   ];

   function generateFormikInitialValues(fields = []) {
      if (!fields[0]) throw new Error("Invalid inputFields");

      const initialValues = {};
      for (const field of fields) {
         if (!("defaultValue" in field))
            throw new Error("Missing default value");

         initialValues[field.key] = field.defaultValue;
      }
      return initialValues;
   }

   const form = useFormik({
      validateOnMount: true,
      initialValues: generateFormikInitialValues(inputFields),
      onSubmit: async (values) => {
         try {
            const parsedValues = await YupNewRecurringSchema().validate(values);
            const isStartToday = isToday(parsedValues.startDate);
            if (isStartToday) await resetLastCheck();

            let res;
            if (!isEdit) {
               res = await addNewRecurringExpense(parsedValues);
            } else if (isEdit) {
               const id = getQueryByName("modal");
               res = await editRecurringExpense(parsedValues, id);
            }
            if (!res.ok) return toast.error("Server error, Try again later");

            toast.success("Success");
            router.replace(`/${params.lang}/recurring-expenses`);
         } catch (error) {
            console.log(error);
         }
      },
      validationSchema: YupNewRecurringSchema(),
   });

   async function fetchRecurringExpense(id) {
      try {
         const res = await fetchRecurringExpenseById(id);

         if (!res.ok) return console.log(res.data);
         const recurringExpense = {
            ...res.data,
            startDate: formatDate(res.data.startDate, "yyyy-MM-dd"),
         };
         form.setValues(recurringExpense);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <section className="max-w-72 mx-auto">
         <form onSubmit={form.handleSubmit} className="space-y-3">
            {inputFields.map((field) => (
               <label key={field.title} className="form-control w-full">
                  {/* title */}
                  <div className="label">
                     <span className="label-text">{field.title}</span>
                  </div>
                  <input
                     {...form.getFieldProps(field.key)}
                     type={field.inputType}
                     placeholder={text.placeHolder}
                     className="input input-bordered w-full placeholder:opacity-40"
                     min={field?.min}
                  />
                  {form.touched[field.key] && form.errors[field.key] && (
                     <div className="text-sm text-error text-opacity-80">
                        {form.errors[field.key]}
                     </div>
                  )}
               </label>
            ))}

            <button
               disabled={!form.isValid}
               type="submit"
               className="btn btn-primary btn-block"
            >
               {text.addBtn}
            </button>
         </form>
      </section>
   );
};

export default NewRecurringExpense;
