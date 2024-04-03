import { getTheme } from "@/actions";
import { Bars3Icon } from "@heroicons/react/24/outline";
import LocaleSwitcher from "../localeSwitcher";
import ThemeSwitcher from "../themeSwitcher";

const Navbar = async () => {
   const theme = (await getTheme()) || "dark";

   return (
      <div className="navbar bg-base-100 ">
         <div className="navbar-start ">
            <label
               className="btn btn-ghost btn-circle md:hidden"
               htmlFor="my-drawer-2"
            >
               <Bars3Icon className="h-5 w-5" />
            </label>
         </div>
         <div className="navbar-center">
            <a className="btn btn-ghost text-2xl">Atsmai</a>
         </div>

         <div className="navbar-end gap-5">
            <LocaleSwitcher />
            <ThemeSwitcher sessionTheme={theme} />
         </div>
      </div>
   );
};

export default Navbar;
