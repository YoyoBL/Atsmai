"use client";

import { addNewUser } from "@/actions/users.actions";
import { YupRegisterSchema } from "@/lib/yupSchemas";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import { USER_HOME_PAGE } from "@/constants";

const RegisterForm = () => {
   const [serverError, setServerError] = useState(null);
   const { lang } = useParams();

   const formik = useFormik({
      validateOnMount: true,
      initialValues: {
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         country: "",
         city: "",
      },
      onSubmit: async (values) => {
         const parsedValues = await YupRegisterSchema().validate(values);
         const res = await addNewUser(parsedValues);
         if (!res.ok) return setServerError(res.data);
         //Add confirmation toast
         signIn(undefined, { callbackUrl: `/${lang}/${USER_HOME_PAGE}}` });
      },
      validationSchema: YupRegisterSchema(),
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
                  placeholder="First Name*"
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
                  placeholder="Last Name*"
                  className="input input-bordered focus:input-primary w-full"
               />
               {displayError("lastName") && (
                  <div className="text-error text-xs mt-1">
                     {formik.errors.lastName}
                  </div>
               )}
            </div>
         </div>
         <input
            {...formik.getFieldProps("email")}
            type="text"
            placeholder="Email*"
            className="input input-bordered w-full focus:input-primary"
         />
         {displayError("email") && (
            <div className="text-error text-xs mt-1">{formik.errors.email}</div>
         )}

         <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="Password*"
            className="input input-bordered w-full focus:input-primary"
         />
         {displayError("password") && (
            <div className="text-error text-xs mt-1">
               {formik.errors.password}
            </div>
         )}

         <div className="grid grid-cols-2 gap-3">
            <div>
               <input
                  {...formik.getFieldProps("country")}
                  type="text"
                  placeholder="Country*"
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
                  placeholder="City*"
                  className="input input-bordered focus:input-primary w-full"
               />
               {displayError("city") && (
                  <div className="text-error text-xs mt-1">
                     {formik.errors.city}
                  </div>
               )}
            </div>
         </div>
         <button type="submit" className="btn btn-primary btn-block">
            Register
         </button>
      </form>
   );
};

export default RegisterForm;
