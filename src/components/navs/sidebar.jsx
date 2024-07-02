import AddNewEntryBtn from "../new-entry/newEntryBtn";

import Navbar from "./navbar";
import BottomNavbar from "./bottomNavbar";
import SidebarContent from "./sidebarContent";
import { auth } from "@/auth";

export default async function SideBar({ children, lang }) {
   const session = await auth();
   return (
      <div className="drawer md:drawer-open">
         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
         <div className=" drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Navbar />

            {children}

            <AddNewEntryBtn />
            {session && <BottomNavbar />}
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
