"use client";

import cn from "@/lib/tailwindMerge";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useQueryParams from "@/hooks/useQueryParams";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchForm = ({ text }) => {
   const { getQueryByName, getPathWithNewParam, deleteAndReturnPath } =
      useQueryParams();

   const inputValue = getQueryByName("searchValue") || "";
   const [searchValue, setSearchValue] = useState(inputValue);
   const entryType = getQueryByName("entryType");

   const router = useRouter();

   async function handleSubmit(e) {
      e.preventDefault();
      if (searchValue.length <= 1) return;
      const search = searchValue === "כללי" ? "general" : searchValue;
      const updatedPath = getPathWithNewParam("searchValue", search);
      router.push(updatedPath);
   }
   function handleReset() {
      setSearchValue("");
      if (!inputValue) return;

      const path = deleteAndReturnPath("searchValue");
      router.push(path);
   }

   return (
      <form onSubmit={handleSubmit} className="grid gap-3">
         <label className="input input-bordered flex flex-1 justify-between items-center gap-2">
            <MagnifyingGlassIcon className="h-5 w-5" />
            <input
               type="text"
               name="searchValue"
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               className="grow placeholder:opacity-40"
               placeholder={text.placeHolder}
            />
            {searchValue && (
               <XCircleIcon
                  onClick={handleReset}
                  className="size-5 hover:size-6 active:size-5 cursor-pointer transition-all duration-100 "
               />
            )}
         </label>
         <div className="grid grid-cols-2 gap-3">
            <Link
               href={getPathWithNewParam("entryType", "incomes")}
               className={cn(
                  "btn",
                  entryType === "incomes" ? "btn-primary" : "btn-neutral"
               )}
            >
               {text.incomes}
            </Link>
            <Link
               href={getPathWithNewParam("entryType", "expenses")}
               className={cn(
                  "btn",
                  entryType === "expenses" ? "btn-secondary" : "btn-neutral"
               )}
            >
               {text.expenses}
            </Link>
         </div>
         <button disabled={searchValue.length < 2} className="btn btn-primary">
            <MagnifyingGlassIcon className="h-5 w-5" />
         </button>
      </form>
   );
};

export default SearchForm;
