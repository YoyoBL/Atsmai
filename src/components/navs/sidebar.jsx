import Link from "next/link";
import LocaleSwitcher from "../localeSwitcher";
import ThemeSwitcher from "../themeSwitcher";
import AddNewEntryBtn from "../new-entry/newEntryBtn";
import { getTheme } from "@/actions";
import {
   ArrowPathIcon,
   ArrowsUpDownIcon,
   BriefcaseIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./navbar";
import BottomNavbar from "./bottomNavbar";

export default async function SideBar({ children, lang }) {
   const theme = (await getTheme()) || "dark";
   return (
      <div className="drawer md:drawer-open">
         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
         <div className="relative drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Navbar />
            {children}
            <AddNewEntryBtn />
            <BottomNavbar />
         </div>
         <div className="drawer-side">
            <label
               htmlFor="my-drawer-2"
               aria-label="close sidebar"
               className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
               {/* Sidebar content here */}
               {/* <Header lang={params.lang} /> */}
               <div className="flex justify-between">
                  <Link href="/api/auth/signin" className="btn btn-primary">
                     Sign In
                  </Link>
                  <Link href="/api/auth/signout" className="btn btn-primary">
                     Sign Out
                  </Link>
                  <LocaleSwitcher />
                  <ThemeSwitcher sessionTheme={theme} />
               </div>

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
         </div>
      </div>
   );
}
