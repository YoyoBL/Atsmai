"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/navigation";

const Modal = ({ children }) => {
   const { getQueryByName } = useQueryParams();
   const router = useRouter();
   const isOpen = getQueryByName("modal");
   return (
      isOpen && (
         <dialog id="my_modal_3" className="modal modal-open">
            <div className="modal-box">{children}</div>
            {/* close modal on outside click */}
            <span onClick={router.back} className="modal-backdrop"></span>
         </dialog>
      )
   );
};

export default Modal;
