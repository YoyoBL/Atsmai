import {
   ArrowPathIcon,
   ArrowsUpDownIcon,
   MagnifyingGlassIcon,
   InformationCircleIcon,
   EnvelopeIcon,
   HomeIcon,
   LockClosedIcon,
   BriefcaseIcon,
   LightBulbIcon,
} from "@heroicons/react/24/outline";
import SignOutBtn from "./signOutBtn";
import SignInBtn from "./signInBtn";
import RegisterBtn from "./registerBtn";
import MenuLink from "./menuLink";
import { format } from "date-fns";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { auth } from "@/auth";
import Avatar from "../profile/avatar";
import UserName from "./userName";
import ThemeSwitcher from "../themeSwitcher";
import { getTheme } from "@/actions/theme.actions";
import LocaleSwitcher from "../localeSwitcher";

const currentDate = format(new Date(), "MM-yy");
const protectedLinks = [
   {
      title: "Entries",
      key: "entries",
      href: `/?entriesType=incomes&month=${currentDate}`,
      icon: <ArrowsUpDownIcon className="h-5 w-5" />,
   },
   {
      title: "Projects",
      key: "projects",
      href: "/projects",
      icon: <BriefcaseIcon className="h-5 w-5" />,
   },
   {
      title: "Insights",
      key: "insights",
      href: "/insights",
      icon: <LightBulbIcon className="h-5 w-5" />,
   },
   {
      title: "Search Entries",
      key: "searchEntries",
      href: "/search?entriesType=incomes",
      icon: <MagnifyingGlassIcon className="h-5 w-5" />,
   },
   {
      title: "Recurring expenses",
      key: "recurringExpenses",
      href: "/recurring-expenses",
      icon: <ArrowPathIcon className="h-5 w-5" />,
   },
   {
      title: "About",
      key: "about",
      href: "/about",
      icon: <InformationCircleIcon className="h-5 w-5" />,
   },
   {
      title: "Contact",
      key: "contact",
      href: "/contact",
      icon: <EnvelopeIcon className="h-5 w-5" />,
   },
];

const publicLinks = [
   {
      title: "Welcome",
      key: "welcome",
      href: "/welcome",
      icon: <HomeIcon className="h-5 w-5" />,
   },
   {
      title: "About",
      key: "about",
      href: "/about",
      icon: <InformationCircleIcon className="h-5 w-5" />,
   },
   {
      title: "Contact",
      key: "contact",
      href: "/contact",
      icon: <EnvelopeIcon className="h-5 w-5" />,
   },
];

const adminCRMLink = {
   title: "Admin CRM",
   key: "adminCrm",
   href: "/admin-crm",
   icon: <LockClosedIcon className="h-5 w-5" />,
};

const SidebarContent = async ({ lang }) => {
   const { menuLinks, common } = await getDictionary(lang);
   const session = await auth();
   const sessionTheme = await getTheme();

   const user = session?.user || null;

   return (
      <div className="flex flex-col gap-3 p-4 w-80 min-h-full bg-base-200 text-base-content">
         {/* Sidebar content here */}
         {/* <Header lang={params.lang} /> */}
         <ul>
            {user?.role === "admin" && (
               <MenuLink link={adminCRMLink} text={menuLinks} />
            )}
            {session
               ? protectedLinks.map((link) => (
                    <MenuLink key={link.title} link={link} text={menuLinks} />
                 ))
               : publicLinks.map((link) => (
                    <MenuLink key={link.title} link={link} text={menuLinks} />
                 ))}
         </ul>
         <ul className="mt-auto grid place-items-center gap-2">
            <div className="w-full md:hidden flex gap-3 justify-around">
               <LocaleSwitcher />
               <ThemeSwitcher sessionTheme={sessionTheme} />
            </div>
            <div className="divider w-full"></div>
            <li>
               {" "}
               <UserName />
            </li>

            {session && (
               <li>
                  <Avatar />
               </li>
            )}
            <li>
               {session ? (
                  <SignOutBtn text={common} />
               ) : (
                  <div className="flex gap-3">
                     <SignInBtn text={common} />
                     <RegisterBtn text={common} />
                  </div>
               )}
            </li>
            <li className="text-xs text-opacity-50 pt-5">
               Generated by Yoel Bar-Lev
            </li>
         </ul>
      </div>
   );
};

export default SidebarContent;
