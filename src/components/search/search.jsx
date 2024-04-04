"use client";

import EntryCard from "@/components/entries/entryCard";
import cn from "@/lib/tailwindMerge";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchEntries } from "@/actions/entries.actions";
import Link from "next/link";
import useQueryParams from "@/hooks/useQueryParams";
import { useState } from "react";
import Modal from "../common/modal";
import ExpandedEntry from "../entries/expandedEntry";

const Search = () => {
   const [searchValue, setSearchValue] = useState("");
   const [serverError, setServerError] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   const { getQueryByName, getPathWithNewParam } = useQueryParams();
   const entryType = getQueryByName("entryType");
   const entryId = getQueryByName("modal");

   async function handleSubmit(e) {
      e.preventDefault();
      if (searchValue.length <= 1) return;

      const res = await searchEntries(entryType, searchValue);
      if (!res.ok)
         return setServerError("Something went wrong, try again later.");
      setSearchResults(res.data);
   }

   function getExpandedEntry() {
      if (!entryId) return;

      const entry = searchResults.find((entry) => entry._id === entryId);
      entry.entryType = entryType;

      return entry;
   }

   return (
      <div className="card-body gap-3">
         <div className="card-title">Search Entries</div>

         <form onSubmit={handleSubmit} className="grid grid-cols gap-3">
            <label className="input input-bordered flex flex-1 justify-between items-center gap-2">
               <input
                  type="text"
                  name="searchValue"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="grow"
                  placeholder="Type Here..."
               />
            </label>
            <div className="grid grid-cols-2 gap-3">
               <Link
                  href={getPathWithNewParam("entryType", "incomes")}
                  className={cn(
                     "btn",
                     entryType === "incomes" ? "btn-primary" : "btn-neutral"
                  )}
               >
                  Incomes
               </Link>
               <Link
                  href={getPathWithNewParam("entryType", "expenses")}
                  className={cn(
                     "btn",
                     entryType === "expenses" ? "btn-secondary" : "btn-neutral"
                  )}
               >
                  expenses
               </Link>
            </div>
            <button
               disabled={searchValue.length < 2}
               className="btn btn-primary"
            >
               <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
         </form>

         <div className="h-96 bg-base-300 rounded-xl p-3">
            {searchResults[0] === "Nothing Found" ? (
               <div>{searchResults}</div>
            ) : (
               searchResults.map((result) => (
                  <EntryCard key={result._id} entry={result} />
               ))
            )}
         </div>
         <Modal>
            <ExpandedEntry entry={getExpandedEntry()} />
         </Modal>
      </div>
   );
};

export default Search;
