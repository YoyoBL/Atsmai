"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function AddNewEntryBtn() {
   const currentPath = usePathname();
   const { lang } = useParams();
   if (currentPath.includes("/new-entry")) return null;
   return (
      <div className="fixed bottom-0 right-0 rtl:right-auto rtl:left-0 m-5 ">
         <Link href={`/${lang}/new-entry`}>
            <button className="btn btn-lg btn-circle btn-primary">
               <PlusIcon className="h-6 w-6" />
            </button>
         </Link>
      </div>
   );
}

export default AddNewEntryBtn;
