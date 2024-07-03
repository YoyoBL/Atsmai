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

export const protectedLinks = {
   entries: {
      title: "Entries",
      key: "entries",
      href: `/?entriesType=incomes&month=current`,
      icon: <ArrowsUpDownIcon className="h-5 w-5" />,
   },
   projects: {
      title: "Projects",
      key: "projects",
      href: "/projects",
      icon: <BriefcaseIcon className="h-5 w-5" />,
   },
   insights: {
      title: "Insights",
      key: "insights",
      href: "/insights",
      icon: <LightBulbIcon className="h-5 w-5" />,
   },
   searchEntries: {
      title: "Search Entries",
      key: "searchEntries",
      href: "/search?entriesType=incomes",
      icon: <MagnifyingGlassIcon className="h-5 w-5" />,
   },
   recurringExpenses: {
      title: "Recurring expenses",
      key: "recurringExpenses",
      href: "/recurring-expenses",
      icon: <ArrowPathIcon className="h-5 w-5" />,
   },
   about: {
      title: "About",
      key: "about",
      href: "/about",
      icon: <InformationCircleIcon className="h-5 w-5" />,
   },
   contact: {
      title: "Contact",
      key: "contact",
      href: "/contact",
      icon: <EnvelopeIcon className="h-5 w-5" />,
   },
};

export const publicLinks = {
   welcome: {
      title: "Welcome",
      key: "welcome",
      href: "/welcome",
      icon: <HomeIcon className="h-5 w-5" />,
   },
   about: {
      title: "About",
      key: "about",
      href: "/about",
      icon: <InformationCircleIcon className="h-5 w-5" />,
   },
   contact: {
      title: "Contact",
      key: "contact",
      href: "/contact",
      icon: <EnvelopeIcon className="h-5 w-5" />,
   },
};

export const adminCRMLink = {
   title: "Admin CRM",
   key: "adminCrm",
   href: "/admin-crm",
   icon: <LockClosedIcon className="h-5 w-5" />,
};
