"use client";

import { fetchCategories } from "@/actions";
import { useEffect, useState } from "react";

const Categories = ({ formik = {} }) => {
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      (async () => {
         const { ok, data } = await fetchCategories();
         setCategories(data);
         setIsLoading(false);
      })();
   }, []);

   return (
      <div className="w-full">
         <label className="form-control ">
            <div className="label">
               <span className="label-text">Category</span>
            </div>
            <input
               {...formik.getFieldProps("category")}
               type="text"
               placeholder="New Category"
               className="input input-bordered input-primary w-full"
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
                     ))
               )}
            </div>
         </div>
      </div>
   );
};

export default Categories;
