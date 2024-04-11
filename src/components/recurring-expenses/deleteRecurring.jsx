"use client";

import { deleteRecurringExpense } from "@/actions/recurringExpense.actions";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const DeleteRecurring = ({ id }) => {
   const { getPathWithNewParam, getQueryByName } = useQueryParams();
   const { lang } = useParams();
   const router = useRouter();
   const confirmed = getQueryByName("confirm");

   useEffect(() => {
      if (!confirmed) return;
      if (confirmed.startsWith("confirmed")) {
         (async () => {
            const deleteId = confirmed.split("@")[1];
            try {
               const res = await deleteRecurringExpense(deleteId);
               console.log(res);
               if (!res.ok) return;
               router.push(`/${lang}/recurring-expenses`);
               toast.success("Deleted");
            } catch (error) {
               console.log(error);
            }
         })();
      }
   }, [confirmed, router]);

   return (
      <>
         <Link
            href={getPathWithNewParam("confirm", id)}
            className="btn btn-outline btn-neutral btn-sm"
         >
            Delete
         </Link>
      </>
   );
};

export default DeleteRecurring;
