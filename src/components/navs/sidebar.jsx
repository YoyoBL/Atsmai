import AddNewEntryBtn from "../new-entry/newEntryBtn";
import { getTheme } from "@/actions";

import Navbar from "./navbar";
import BottomNavbar from "./bottomNavbar";
import SidebarContent from "./sidebarContent";

export default async function SideBar({ children, lang }) {
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
            <SidebarContent lang={lang} />
         </div>
      </div>
   );
}
