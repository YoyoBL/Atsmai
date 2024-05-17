"use client";

import { openModalDOM } from "@/lib/modalTools";
import cn from "@/lib/tailwindMerge";

const ChangeStatusBtn = ({ modalId, children, className }) => {
   return (
      <div
         onClick={() => openModalDOM(modalId)}
         className={cn("flex gap-2 btn btn-outline btn-sm w-fit", className)}
      >
         {children}
      </div>
   );
};

export default ChangeStatusBtn;
