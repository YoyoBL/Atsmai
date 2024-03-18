import {
   EllipsisVerticalIcon,
   PencilIcon,
   PlusCircleIcon,
   PlusIcon,
} from "@heroicons/react/24/outline";

const RecurringExpensesPage = () => {
   return (
      <section>
         <h1 className="text-lg m-4 mb-5">Recurring Expenses</h1>

         <div className="flex flex-wrap sm:justify-normal justify-center items-center gap-3">
            <button className="btn btn-outline btn-circle p-4 size-20">
               <PlusIcon />
            </button>

            <div className="card bg-base-200">
               <div className="card-body p-2">
                  {/* card header */}
                  <div className="card-title text-base justify-between">
                     <span>Title</span>
                     <div className="dropdown">
                        <EllipsisVerticalIcon
                           tabIndex={0}
                           role="button"
                           className="btn btn-sm btn-circle p-0 btn-ghost size-5"
                        />
                        <ul
                           tabIndex={0}
                           className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                        >
                           <li>
                              <button className="btn btn-outline btn-circle p-3">
                                 <PencilIcon className="size-full" />
                              </button>
                           </li>
                           <li>
                              <a>Item 2</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
            <div className="card bg-base-200">
               <div className="card-body p-2">
                  <div className="card-title text-base">Title</div>
                  <ul className="text-sm bg-base-100 p-2 rounded-md">
                     <li>150$</li>
                     <li>Accountant</li>
                     <li>14</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
};

export default RecurringExpensesPage;
