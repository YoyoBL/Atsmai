"use client";

import { deleteEntry, fetchThreeLast } from "@/actions/entries.actions";
import useQueryParams from "@/hooks/useQueryParams";
import { formatDate } from "@/lib/dates";
import { Bar } from "@/lib/imports";
import {
   PencilIcon,
   PresentationChartBarIcon,
   TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExpandedEntry = ({ entry }) => {
   const router = useRouter();
   const { lang } = useParams();
   const { getQueryByName } = useQueryParams();

   const [showLast3, setShowLast3] = useState(false);
   const [data, setData] = useState({
      labels: [""],
      datasets: [""],
   });

   useEffect(() => {
      if (!showLast3) return;
      fetchLast3();
   }, [showLast3]);

   if (!entry?._id) return null;

   async function handleEdit() {
      const res = await deleteEntry(entry);
      if (!res.ok) return console.log("Error", res.data);

      router.back();
   }

   async function fetchLast3() {
      const entries = await fetchThreeLast(entry);

      if (!entries.length) return;

      setData({
         labels: entries.map((entry) => formatDate(entry.date, "dd/MM")),
         datasets: [
            {
               label: "Amount",
               data: entries.map((entry) => entry.amount),
               maxBarThickness: 20,
            },
         ],
      });
   }

   const { amount, category } = entry;
   const date = formatDate(entry.date, "dd/MM");
   return (
      <div className="space-y-2">
         <div className="bg-primary text-white flex flex-wrap justify-around items-center font-light p-4 rounded-xl">
            <div> {category}</div>
            <div className="text-3xl ">{amount}</div>
            <div> {date}</div>
            {/* <div className="divider w-full text-xs text-base-content">
               Notes
            </div>
            <div className="">Some Notes</div> */}
         </div>

         {/* Collapse */}

         {!showLast3 && (
            <button
               onClick={() => setShowLast3(true)}
               className="btn btn-neutral btn-block"
            >
               Last 3
               <PresentationChartBarIcon className="h-5 w-5" />
            </button>
         )}
         {showLast3 && (
            <div className="card">
               <div className="card-body">
                  <div className="divider text-lg">Last 3</div>
                  {data.labels.length ? (
                     <Bar data={data} />
                  ) : (
                     <div className="text-center">No data Found.</div>
                  )}
               </div>
            </div>
         )}
         <div className="flex justify-center gap-5">
            <Link
               href={`/${lang}/new-entry?edit=${entry._id}&entryType=${entry.entryType}`}
               className="btn btn-md btn-circle btn-outline btn-neutral"
            >
               <PencilIcon className="h-6 w-6" />
            </Link>
            <button
               onClick={handleEdit}
               className="btn btn-md btn-circle btn-outline btn-neutral"
            >
               <TrashIcon className="h-6 w-6" />
            </button>
         </div>
      </div>
   );
};

export default ExpandedEntry;
