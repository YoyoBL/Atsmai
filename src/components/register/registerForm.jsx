"use client";

import { addNewUser } from "@/actions/users.actions";
import { YupRegisterSchema } from "@/lib/yupSchemas";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = ({ text }) => {
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
         vat: false,
      },
      onSubmit: async (values) => {
         const parsedValues = await YupRegisterSchema().validate(values);
         const res = await addNewUser(parsedValues);
         if (!res.ok) return setServerError(res.data);
         toast.success("Account created, Please sign in");
         signIn(undefined, { callbackUrl: `/${lang}/` });
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
         <input
            {...formik.getFieldProps("email")}
            type="text"
            placeholder={text.email + "*"}
            className="input input-bordered w-full focus:input-primary"
         />
         {displayError("email") && (
            <div className="text-error text-xs mt-1">{formik.errors.email}</div>
         )}
         <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder={text.password + "*"}
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

         {/* Business type */}
         <div>
            <fieldset className="grid grid-cols-2">
               <div className="form-control">
                  <label className="label cursor-pointer">
                     <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:radio-primary"
                        onChange={() => formik.setFieldValue("vat", false)}
                        defaultChecked
                     />
                     <span className="label-text">Exempt business</span>
                  </label>
               </div>
               <div className="form-control">
                  <label className="label cursor-pointer">
                     <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:radio-primary"
                        onChange={() => formik.setFieldValue("vat", true)}
                     />
                     <span className="label-text">Licensed business</span>
                  </label>
               </div>
            </fieldset>
         </div>

         <button
            disabled={!formik.isValid}
            type="submit"
            className="btn btn-primary btn-block"
         >
            {text.title}
         </button>
      </form>
   );
};

export default RegisterForm;
