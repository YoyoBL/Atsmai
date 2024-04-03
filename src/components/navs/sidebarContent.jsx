import Link from "next/link";

import {
   ArrowPathIcon,
   ArrowsUpDownIcon,
   BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { getTheme } from "@/actions";

const SidebarContent = async ({ lang }) => {
   return (
      <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
         {/* Sidebar content here */}
         {/* <Header lang={params.lang} /> */}

         <ul>
            <li>
               <Link href={`/${lang}/`}>
                  <ArrowsUpDownIcon className="h-5 w-5" />
                  Entries
               </Link>
            </li>
            <li>
               <Link href={`/${lang}/recurring-expenses`}>
                  <ArrowPathIcon className="h-5 w-5" />
                  Recurring expenses
               </Link>
            </li>
            <li>
               <Link href={`/${lang}/`}>
                  <BriefcaseIcon className="h-5 w-5" />
                  Projects
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default SidebarContent;
