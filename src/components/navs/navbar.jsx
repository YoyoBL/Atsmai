import { Bars3Icon } from "@heroicons/react/24/outline";
import LocaleSwitcher from "../localeSwitcher";
import ThemeSwitcher from "../themeSwitcher";
import { getTheme } from "@/actions/theme.actions";
import Image from "next/image";
import LOGO from "@/images/LOGO.png";

const Navbar = async () => {
   const theme = (await getTheme()) || "dark";

   return (
      <div className="navbar bg-base-100 ">
         <div className="navbar-start ">
            <label
               className="btn btn-ghost btn-circle md:hidden "
               htmlFor="my-drawer-2"
            >
               <Bars3Icon className="h-5 w-5" />
            </label>
         </div>
         <div className="navbar-center flex-1">
            <a className="btn btn-ghost text-2xl">
               <Image height={25} width={25} src={LOGO} alt="Atsmai logo" />
               Atsmai
            </a>
         </div>

         <div className=" navbar-end ">
            <div className="hidden md:flex gap-5">
               <LocaleSwitcher />
               <ThemeSwitcher sessionTheme={theme} />
            </div>
         </div>
      </div>
   );
};

export default Navbar;
