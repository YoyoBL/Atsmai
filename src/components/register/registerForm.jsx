"use client";

import { YupRegisterSchema } from "@/lib/yupSchemas";
import { useFormik } from "formik";

const RegisterForm = () => {
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
         console.log(values);
      },
      validationSchema: YupRegisterSchema(),
   });
   const displayError = (fieldName) =>
      formik.touched[fieldName] && formik.errors[fieldName];
   return (
      <form onSubmit={formik.handleSubmit} className="space-y-3">
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
