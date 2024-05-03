"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import ModalClient from "../common/modalClient";
import NewProjectForm from "./newProjectForm";

const AddProject = () => {
   const modalId = "new-project";

   function openModal() {
      const modal = document.getElementById(modalId);
      modal.showModal();
   }

   function closeModal() {
      const modal = document.getElementById(modalId);
      modal.close();
   }

   return (
      <>
         <button
            onClick={openModal}
            className="btn btn-outline btn-circle p-4 size-20"
         >
            <PlusIcon />
         </button>

         <ModalClient modalId={modalId}>
            <NewProjectForm onAdd={closeModal} />
         </ModalClient>
      </>
   );
};

export default AddProject;
