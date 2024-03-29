import { formatDate } from "@/lib/dates";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import EditBtn from "./editRecurringBtn";

const RecurringExpenseCard = ({ recurringExpense }) => {
   const { title, amount, category, startDate, _id } = recurringExpense;
   const recurringDate = formatDate(startDate, "dd");
   return (
      <div className="card bg-base-200 min-w-28">
         <div className="card-body p-2">
            {/* card header */}
            <div className="card-title text-base justify-between">
               <span>{title}</span>
               <div className="dropdown">
                  <EllipsisVerticalIcon
                     tabIndex={0}
                     role="button"
                     className="btn btn-sm btn-circle p-0 btn-ghost size-5"
                  />
                  <ul
                     tabIndex={0}
                     className="dropdown-content z-[1] menu p-5 shadow bg-base-200 rounded-box space-y-2"
                  >
                     <li>
                        <EditBtn id={_id} />
                     </li>
                     <li>
                        <button className="btn btn-outline btn-neutral btn-sm">
                           Delete
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
            <ul className="text-sm bg-base-100 p-2 rounded-md">
               <li>{amount}</li>
               <li>{category}</li>
               <li>{recurringDate}</li>
            </ul>
         </div>
      </div>
   );
};

export default RecurringExpenseCard;
