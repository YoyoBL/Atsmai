"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import ModalClient from "../common/modalClient";
import NewProjectForm from "./newProjectForm";
import { closeModalDOM, openModalDOM } from "@/lib/modalTools";

const AddProject = () => {
   const modalId = "new-project";

   return (
      <>
         <button
            onClick={() => openModalDOM(modalId)}
            className="btn btn-outline btn-circle p-4 size-20"
         >
            <PlusIcon />
         </button>

         <ModalClient modalId={modalId}>
            <NewProjectForm onAdd={() => closeModalDOM(modalId)} />
         </ModalClient>
      </>
   );
};

export default AddProject;
