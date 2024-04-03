import AddNewEntryBtn from "../new-entry/newEntryBtn";
import { getTheme } from "@/actions";

import Navbar from "./navbar";
import BottomNavbar from "./bottomNavbar";
import SidebarContent from "./sidebarContent";
import { getServerSession } from "next-auth";

export default async function SideBar({ children, lang }) {
   const session = await getServerSession();
   return (
      <div className="drawer md:drawer-open">
         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
         <div className="relative drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Navbar />
            {session ? (
               children
            ) : (
               <div className="flex-grow">Some Guest text</div>
            )}

            <AddNewEntryBtn />
            <BottomNavbar />
         </div>
         <div className="drawer-side">
            <label
               htmlFor="my-drawer-2"
               aria-label="close sidebar"
               className="drawer-overlay"
            ></label>
            <SidebarContent lang={lang} />
         </div>
      </div>
   );
}
