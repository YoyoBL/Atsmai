"use client";

import { openModalDOM } from "@/lib/modalTools";

const ChangeStatusBtn = ({ modalId, children }) => {
   return (
      <div
         onClick={() => openModalDOM(modalId)}
         className="flex gap-2 btn btn-sm btn-neutral w-fit"
      >
         {children}
      </div>
   );
};

export default ChangeStatusBtn;
