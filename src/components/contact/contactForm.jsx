"use client";

import { useForm, ValidationError } from "@formspree/react";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";

const ContactForm = () => {
   const [state, handleSubmit] = useForm("mzbnkdge");
   if (state.succeeded) {
      return (
         <p role="alert" className="alert alert-success">
            Message sent, Thank you.
         </p>
      );
   }

   if (state.errors) {
      return (
         <p role="alert" className="alert alert-error">
            Something went wrong, Try again later.
         </p>
      );
   }
   return (
      <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
         <label className="input input-bordered flex items-center gap-2 col-span-1">
            <EnvelopeIcon className=" h-5 w-5" />
            <input
               id="email"
               type="text"
               className="w-full grow"
               placeholder="Email*"
               required
            />
         </label>

         <label className="input input-bordered flex items-center gap-2 col-span-1">
            <UserIcon className=" h-5 w-5" />
            <input
               id="full-name"
               type="text"
               className="w-full grow"
               placeholder="Full name*"
               autoComplete="name"
               required
            />
         </label>
         <label className="input input-bordered flex items-center gap-2 col-span-full">
            <input
               id="subject"
               type="text"
               className="w-full grow"
               placeholder="Subject*"
               minLength="2"
               required
            />
         </label>
         <textarea
            id="message"
            className="textarea textarea-bordered col-span-2"
            placeholder="Message...*"
            name="message"
            required
            minLength="5"
         ></textarea>
         <button
            className="btn btn-primary col-span-2"
            type="submit"
            disabled={state.submitting}
         >
            Submit
         </button>
      </form>
   );
};

export default ContactForm;
