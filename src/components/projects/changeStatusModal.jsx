"use client";

import { useParams } from "next/navigation";
import ModalConfirm from "../common/modalConfirm";
import toast from "react-hot-toast";
import { changeStatus } from "@/actions/project.actions";

const ChangeStatusModal = ({ modalId, message }) => {
   const { projectId } = useParams();
   async function handleStatusChange() {
      try {
         const res = await changeStatus(projectId);
         if (!res.ok) throw new Error("Server error");
         toast.success("Status changed");
      } catch (error) {
         console.log(error);
         return toast.error("Server error, try again later");
      }
   }
   return (
      <ModalConfirm
         modalId={modalId}
         message={message}
         onConfirm={handleStatusChange}
      />
   );
};

export default ChangeStatusModal;
