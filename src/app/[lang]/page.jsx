import { getDictionary } from "@/lib/dictionary";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Home({ params: { lang } }) {
   const { page } = await getDictionary(lang);
   return (
      <section className="h-full">
         <div className="card bg-base-200 card-compact w-96 max-h-full">
            <div className="card-body overflow-hidden">
               <div className="card-title">Entries</div>

               {/* Top */}
               <div className="">
                  <div className="grid grid-cols-2 text-center text-lg">
                     <Link
                        href=""
                        className="p-2 bg-primary rounded-t-xl text-base-300"
                     >
                        Incomes
                     </Link>

                     <Link href="" className="p-2 ">
                        Expenses
                     </Link>
                  </div>
                  <div className="bg-primary rounded-xl rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none h-36 flex flex-col justify-center items-center gap-3 shadow">
                     <div className="text-5xl font-light">5000$</div>
                     <div className="flex w-full justify-evenly">
                        <div className="card bg-base-100 bg-opacity-70 w-28">
                           <div className="p-2 text-xs text-center">
                              <div>VAT</div>
                              <div>325</div>
                           </div>
                        </div>
                        <div className="card bg-base-100 bg-opacity-70 w-28">
                           <div className="p-2 text-xs text-center">
                              <div>TAX</div>
                              <div>150</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Dates dort */}
               <div className="card bg-base-100  px-3">
                  <div className="card-body flex-row rtl:flex-row-reverse justify-between items-center">
                     <Link
                        href={""}
                        className="btn btn-ghost btn-circle btn-xs"
                     >
                        <ChevronLeftIcon />
                     </Link>
                     <div>January - February</div>
                     <Link
                        href={""}
                        className="btn btn-ghost btn-circle btn-xs"
                     >
                        <ChevronRightIcon />
                     </Link>
                  </div>
               </div>

               {/* Entries */}
               <div></div>
               <div className="card p-2 pb-0 bg-base-300 overflow-hidden ">
                  <div className="space-y-2 overflow-auto">
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                     <div className="card bg-base-200 px-3">
                        <div className="p-3 flex flex-row justify-between items-center">
                           <div className="text-base">250</div>
                           <div className="text-gray-500">Employees</div>
                           <div className="text-gray-600 text-xs">15-01</div>
                        </div>
                     </div>
                  </div>
                  <div className="absolute bottom-0 left-0  w-full h-16 bg-gradient-to-t from-black opacity-30"></div>
               </div>
            </div>
         </div>
      </section>
   );
}
