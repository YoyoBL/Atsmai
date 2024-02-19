"use client";

import { Tabs } from "flowbite-react";

export default function SortByTimeTabs() {
   return (
      <>
         <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full focus-within:z-10">
               <a
                  href="#"
                  className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                  aria-current="page"
               >
                  חודשי
               </a>
            </li>

            <li className="w-full focus-within:z-10">
               <a
                  href="#"
                  className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
               >
                  דו-חודשי
               </a>
            </li>
         </ul>
      </>
   );
}
