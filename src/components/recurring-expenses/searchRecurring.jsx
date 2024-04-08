"use client";
import useQueryParams from "@/hooks/useQueryParams";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchRecurring = () => {
   const { getQueryByName, getPathWithNewParam, deleteAndReturnPath } =
      useQueryParams();

   const inputValue = getQueryByName("search") || "";

   const [searchValue, setSearchValue] = useState(inputValue);
   const router = useRouter();

   function handleReset() {
      setSearchValue("");
      if (!inputValue) return;

      router.back();
   }

   function handleSearch(e) {
      e.preventDefault();

      const path = getPathWithNewParam("search", searchValue);
      router.push(path);
   }

   return (
      <form onSubmit={handleSearch} className="flex gap-2">
         <label className="mb-3 input input-bordered flex flex-1 justify-between items-center gap-2">
            <input
               type="text"
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               className="grow"
               placeholder="Search..."
            />
            {searchValue && (
               <XCircleIcon
                  onClick={handleReset}
                  className="size-5 hover:size-6 active:size-5 cursor-pointer transition-all duration-100 "
               />
            )}
         </label>
         <button type="submit" className="btn btn-primary">
            <MagnifyingGlassIcon className="h-5 w-5" />
         </button>
      </form>
   );
};

export default SearchRecurring;
