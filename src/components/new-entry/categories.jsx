"use client";

import { fetchCategories } from "@/actions/entries.actions";
import { useEffect, useState } from "react";
import RadioBtn from "../common/radioBtn";

const Categories = ({ formik = {}, color = "primary" }) => {
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      (async () => {
         const categoriesType = color === "primary" ? "incomes" : "expenses";
         const { ok, data } = await fetchCategories(categoriesType);
         if (!ok) return;
         setCategories(data);
         setIsLoading(false);
      })();
   }, [formik.values?.entryType]);

   return (
      <div className="w-full">
         <label className="form-control ">
            <div className="label">
               <span className="label-text">Category</span>
            </div>
            <input
               {...formik.getFieldProps("category")}
               type="text"
               placeholder="General"
               className={`input input-bordered input-${color} w-full`}
               value={
                  formik.values.category === "general"
                     ? ""
                     : formik.values.category
               }
            />
         </label>

         <div className="card bg-base-300 mt-3 p-1">
            <div className="flex gap-2 p-2 flex-row flex-nowrap overflow-x-auto  min-h-16">
               {isLoading ? (
                  <div>Loading..</div>
               ) : (
                  categories
                     .filter((category) => {
                        if (
                           formik.values.category === "general" ||
                           !formik.values.category
                        )
                           return category;
                        return category.includes(formik.values.category);
                     })
                     .map((category) => (
                        <RadioBtn
                           key={category}
                           form={formik}
                           name="category"
                           aria-label={category}
                           value={category}
                           color={color}
                           defaultChecked={category === "general"}
                           className="btn-sm bg-base-200 font-light"
                        />
                     ))
               )}
            </div>
         </div>
      </div>
   );
};

export default Categories;
