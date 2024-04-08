"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/navigation";

const Modal = ({ children }) => {
   const { getQueryByName } = useQueryParams();
   const router = useRouter();
   const isOpen = getQueryByName("modal");
   return (
      isOpen && (
         <dialog className="modal modal-open">
            <div className="modal-box max-w-72">{children}</div>
            {/* close modal on outside click */}
            <span onClick={router.back} className="modal-backdrop"></span>
         </dialog>
      )
   );
};

export default Modal;
