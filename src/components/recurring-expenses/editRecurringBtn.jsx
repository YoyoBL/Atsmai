"use client";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";

const EditBtn = ({ id }) => {
   const { getPathWithNewParam } = useQueryParams();
   return (
      <Link
         href={getPathWithNewParam("modal", id)}
         className="btn btn-outline btn-neutral btn-sm"
      >
         Edit
      </Link>
   );
};

export default EditBtn;
