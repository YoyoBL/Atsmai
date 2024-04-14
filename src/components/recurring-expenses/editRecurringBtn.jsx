"use client";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

const EditRecurringBtn = ({ id }) => {
   const { getPathWithNewParam } = useQueryParams();
   return (
      <Link
         href={getPathWithNewParam("modal", id)}
         className="btn btn-md btn-circle btn-outline btn-neutral"
      >
         <PencilIcon className="h-6 w-6" />
      </Link>
   );
};

export default EditRecurringBtn;
