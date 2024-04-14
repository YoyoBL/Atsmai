"use client";

import {
   deleteRecurringExpense,
   fetchRecurringExpenseById,
   getRecurringExpenses,
} from "@/actions/recurringExpense.actions";
import useQueryParams from "@/hooks/useQueryParams";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import EditRecurringBtn from "./editRecurringBtn";
import DeleteRecurring from "./deleteRecurring";
import ModalClient from "../common/modalClient";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const ExpandedRecurring = ({ text }) => {
   const { getQueryByName } = useQueryParams();
   const id = getQueryByName("expanded");
   const [data, setData] = useState(null);
   const [serverError, setServerError] = useState("");
   const router = useRouter();
   const { lang } = useParams();

   useEffect(() => {
      if (data) return;
      (async () => {
         const res = await fetchRecurringExpenseById(id);
         if (!res.ok) return setServerError(res.data);
         setData(res.data);
      })();
   }, []);

   async function deleteEntry() {
      try {
         const res = await deleteRecurringExpense(data._id);
         if (!res.ok) return toast.error("Server error, try again later");
         toast.success("Deleted");
         router.replace(`/${lang}/recurring-expenses`);
      } catch (error) {
         toast.error("Server error, try again later");
      }
   }

   if (!data)
      return (
         <div className="w-full h-52 flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
         </div>
      );

   if (serverError)
      return (
         <div role="alert" className="alert alert-error">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="stroke-current shrink-0 h-6 w-6"
               fill="none"
               viewBox="0 0 24 24"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
               />
            </svg>
            <span>Server error, try again later.</span>
         </div>
      );

   return (
      <section>
         <div className="card bg-base-200">
            <div className="card-body">
               <div className="card-title text-2xl">{data.title}</div>
               <div className="bg-base-100 p-2 rounded-xl">
                  <table className="table">
                     <tbody>
                        {/* row 1 */}

                        <tr>
                           <td>{text.amount}:</td>
                           <td>{data.amount}</td>
                        </tr>
                        <tr>
                           <td>{text.category}:</td>
                           <td>{data.category}</td>
                        </tr>
                        <tr>
                           <td>{text.startDate}:</td>
                           <td>{format(data.startDate, "dd/MM/yyyy")}</td>
                        </tr>
                        <tr>
                           <td>{text.nextOccurrence}:</td>
                           <td>{format(data.nextOccurrence, "dd/MM/yyyy")}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="cad-actions flex justify-center gap-4">
                  <EditRecurringBtn id={data._id} />
                  <DeleteRecurring />
               </div>
            </div>
         </div>
         <ModalClient modalId="confirm-delete">
            <div className="flex flex-col items-center gap-3">
               <div>{text.deleteMessage}</div>
               <div className="flex justify-center gap-4">
                  <button onClick={deleteEntry} className="btn btn-primary">
                     {text.confirmBtn}
                  </button>
                  <button className="btn btn-neutral">{text.cancelBtn}</button>
               </div>
            </div>
         </ModalClient>
      </section>
   );
};

export default ExpandedRecurring;
