"use client";

import { EditUser } from "@/actions/users.actions";
import { YupEditUserSchema } from "@/lib/yupSchemas";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProfile = ({ text, user }) => {
   const [serverError, setServerError] = useState(null);
   const { lang } = useParams();
   const router = useRouter();

   const { firstName, lastName, country, city, _id: id } = user;

   const formik = useFormik({
      validateOnMount: true,
      initialValues: {
         firstName,
         lastName,

         country,
         city,
      },
      onSubmit: async (values) => {
         const parsedValues = await YupEditUserSchema().validate(values);
         try {
            const res = await EditUser(id, parsedValues);
            if (!res.ok) return setServerError(res.data);
            toast.success("Account Edited");
            const redirect = `/${lang}/profile`;
            router.replace(redirect);
         } catch (error) {
            console.log(error);
         }
      },
      validationSchema: YupEditUserSchema(),
   });
   const displayError = (fieldName) =>
      formik.touched[fieldName] && formik.errors[fieldName];
   return (
      <form onSubmit={formik.handleSubmit} className="space-y-3">
         {serverError && (
            <div role="alert" className="alert alert-error">
               <ExclamationTriangleIcon className="h-6 w-6" />
               {serverError}
            </div>
         )}
         <div className="grid grid-cols-2 gap-3">
            <div>
               <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder={text.firstName + "*"}
                  className="input input-bordered focus:input-primary w-full"
               />
               {displayError("firstName") && (
                  <div className="text-error text-xs mt-1">
                     {formik.errors.firstName}
                  </div>
               )}
            </div>

            <div>
               <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder={text.lastName + "*"}
                  className="input input-bordered focus:input-primary w-full"
               />
               {displayError("lastName") && (
                  <div className="text-error text-xs mt-1">
                     {formik.errors.lastName}
                  </div>
               )}
            </div>
         </div>

         <div className="grid grid-cols-2 gap-3">
            <div>
               <input
                  {...formik.getFieldProps("country")}
                  type="text"
                  placeholder={text.country + "*"}
                  className="input input-bordered focus:input-primary w-full"
               />
               {displayError("country") && (
                  <div className="text-error text-xs mt-1">
                     {formik.errors.country}
                  </div>
               )}
            </div>

            <div>
               <input
                  {...formik.getFieldProps("city")}
                  type="text"
                  placeholder={text.city + "*"}
                  className="input input-bordered focus:input-primary w-full"
               />
               {displayError("city") && (
                  <div className="text-error text-xs mt-1">
                     {formik.errors.city}
                  </div>
               )}
            </div>
         </div>
         <button
            disabled={!formik.isValid}
            type="submit"
            className="btn btn-primary btn-block"
         >
            {lang === "en" ? "Save" : "שמור"}
         </button>
      </form>
   );
};

export default EditProfile;
