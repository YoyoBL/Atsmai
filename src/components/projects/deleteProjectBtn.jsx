"use client";

import { deleteProject } from "@/actions/project.actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import ModalClient from "../common/modalClient";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { closeModalDOM, openModalDOM } from "@/lib/modalTools";
import useQueryParams from "@/hooks/useQueryParams";

const DeleteProjectBtn = ({ id }) => {
   const router = useRouter();
   const { lang } = useParams();
   const modalId = "confirm-project-delete";
   async function handleDelete() {
      try {
         const res = await deleteProject(id);
         if (!res.ok) {
            throw new Error();
         }
         if (res.ok) {
            toast.success("Project Deleted");
            router.replace(`/${lang}/projects`);
         }
      } catch (error) {
         console.log(error);
         toast.error("Server Error, Try again later.");
         closeModalDOM(modalId);
      }
   }

   return (
      <>
         <button className="p-3 hover:text-error active:text-error w-fit">
            <TrashIcon
               onClick={() => openModalDOM(modalId)}
               className="size-4"
            />
         </button>

         {/* modal */}
         <ModalClient modalId={modalId}>
            <p>Are you sure you want to delete this project?</p>

            <div className="modal-action justify-center">
               <button onClick={handleDelete} className="btn btn-error">
                  Delete
               </button>
               <button
                  onClick={() => closeModalDOM(modalId)}
                  className="btn btn-outline"
               >
                  Cancel
               </button>
            </div>
         </ModalClient>
      </>
   );
};

export default DeleteProjectBtn;
