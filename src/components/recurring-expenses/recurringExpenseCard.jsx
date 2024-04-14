"use client";

import { formatDate } from "@/lib/dates";
import { useRouter } from "next/navigation";

const RecurringExpenseCard = ({ recurringExpense }) => {
   const router = useRouter();

   const { title, amount, category, startDate, _id } = recurringExpense;
   const recurringDate = formatDate(startDate, "dd");

   function openModal() {
      router.push(`?expanded=${_id}`);
   }
   return (
      <div
         onClick={openModal}
         className="card bg-base-200 min-w-28 hover:scale-105 duration-150 hover:shadow-lg cursor-pointer"
      >
         <div className="card-body p-3">
            {/* card header */}
            <div className="card-title text-base justify-between">
               <span>{title}</span>
            </div>
            <ul className="text-sm bg-base-100 p-2 rounded-md ">
               <li>{amount}</li>
               <li>{category}</li>
               <li>{recurringDate}</li>
            </ul>
         </div>
      </div>
   );
};

export default RecurringExpenseCard;
