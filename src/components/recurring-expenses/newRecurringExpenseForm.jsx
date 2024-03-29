"use client";

import { addNewRecurringExpense } from "@/actions/recurringExpense.action";
import { YupNewRecurringSchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";

const NewRecurringExpense = () => {
   const inputFields = [
      { key: "title", title: "Title", inputType: "text", defaultValue: "" },
      { key: "amount", title: "Amount", inputType: "text", defaultValue: "" },
      {
         key: "category",
         title: "Category",
         inputType: "text",
         defaultValue: "",
      },
      {
         key: "startDate",
         title: "Start Date",
         inputType: "date",
         defaultValue: "",
      },
   ];
   const params = useParams();
   const router = useRouter();

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
            const res = await addNewRecurringExpense(parsedValues);
            if (!res.ok) return console.log(res.data);
            router.replace(`/${params.lang}/recurring-expenses`);
         } catch (error) {
            console.log(error);
         }
      },
      validationSchema: YupNewRecurringSchema(),
   });

   return (
      <section>
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
                     placeholder="Type here"
                     className="input input-bordered w-full"
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
               Add Recurring Expense
            </button>
         </form>
      </section>
   );
};

export default NewRecurringExpense;
