"use client";
import { updateTitle } from "@/actions/project.actions";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const ProjectTitle = ({ title, id }) => {
   const [edit, setEdit] = useState(false);

   const updateTitleWithId = updateTitle.bind(null, id);
   function onSubmit(formData) {
      updateTitleWithId(formData);
      setEdit(false);
   }
   return (
      <>
         {edit ? (
            <form action={onSubmit} className="grid grid-cols-5 gap-2">
               <input
                  type="text"
                  name="newTitle"
                  placeholder="Type new title..."
                  className="input input-bordered w-full col-span-4"
               />
               <SubmitButton />
            </form>
         ) : (
            <h1
               onClick={() => setEdit(true)}
               className="card-title justify-center text-2xl capitalize btn btn-ghost mx-auto"
            >
               {title} <PencilIcon className="size-3" />
            </h1>
         )}
      </>
   );
};

export default ProjectTitle;

function SubmitButton() {
   const { pending } = useFormStatus();

   return (
      <button type="submit" className="btn btn-primary" disabled={pending}>
         {pending ? (
            <span class="loading loading-spinner loading-sm"></span>
         ) : (
            "Save"
         )}
      </button>
   );
}
