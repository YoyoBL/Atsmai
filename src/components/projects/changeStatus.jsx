"use client";

import ModalConfirm from "../common/modalConfirm";

const ChangeStatusModal = ({ modalId, message }) => {
   function handleStatusChange() {
      console.log("change status");
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
