import Link from "next/link";
import LocaleSwitcher from "./localeSwitcher";
import ThemeSwitcher from "./themeSwitcher";
import AddNewEntryBtn from "./new-entry/newEntryBtn";
import { getTheme } from "@/actions";

export default async function SideBar({ children, lang }) {
   const theme = (await getTheme()) || "dark";
   console.log("Layout", theme);
   return (
      <div className="drawer lg:drawer-open">
         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
         <div className="relative drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            {children}
            <AddNewEntryBtn />
            <label
               htmlFor="my-drawer-2"
               className="btn btn-primary drawer-button lg:hidden"
            >
               Open drawer
            </label>
         </div>
         <div className="drawer-side">
            <label
               htmlFor="my-drawer-2"
               aria-label="close sidebar"
               className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
               {/* Sidebar content here */}
               {/* <Header lang={params.lang} /> */}
               <div className="flex justify-between">
                  <LocaleSwitcher />
                  <ThemeSwitcher sessionTheme={theme} />
               </div>

               <li>
                  <Link href={`/${lang}/`}>Home</Link>
               </li>
               <li>
                  <Link href={`/${lang}/`}>Sidebar Item 2</Link>
               </li>
            </ul>
         </div>
      </div>
   );
}
