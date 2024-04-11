import { searchEntries } from "@/actions/entries.actions";
import EntryCard from "../entries/entryCard";
import Modal from "../common/modal";
import ExpandedEntry from "../entries/expandedEntry";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const SearchResults = async ({
   text,
   searchParams = { entryType: "", searchValue: "", modal: "" },
}) => {
   const searchValue = searchParams?.searchValue;
   if (!searchValue) return null;
   const entryType = searchParams.entryType;

   let serverError = "";
   const res = await searchEntries(entryType, searchValue);
   if (!res.ok) serverError = res.data;
   const searchResults = res.data;
   console.log(searchResults);
   const totalSum = searchResults
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toLocaleString();
   const numOfEntries = searchResults.length;

   function getExpandedEntry() {
      const entryId = searchParams?.modal;
      if (!entryId) return "Missing entry id for modal.";

      const entry = searchResults.find((entry) => entry._id === entryId);
      entry.entryType = entryType;

      return entry;
   }

   return serverError ? (
      <div role="alert" className="alert alert-error">
         <ExclamationTriangleIcon className="h-5 w-5" />
         Something went wrong, try again later.
      </div>
   ) : (
      <>
         <div>
            <div className="stats grid grid-cols-2 text-center shadow w-full ">
               <div className="stat p-2">
                  <div className="stat-value text-2xl">{numOfEntries}</div>
                  <div className="stat-desc">{text.entries}</div>
               </div>

               <div className="stat p-2">
                  <div className="stat-value text-2xl">{totalSum}</div>
                  <div className="stat-desc">{text.total}</div>
               </div>
            </div>
         </div>
         <div className="overflow-auto space-y-2 bg-base-300 rounded-xl p-3">
            {searchResults[0] === "Nothing Found" ? (
               <div>{text.noResults}</div>
            ) : (
               searchResults.map((result) => (
                  <EntryCard key={result._id} entry={result} />
               ))
            )}
         </div>
         <Modal>
            <ExpandedEntry entry={getExpandedEntry()} />
         </Modal>
      </>
   );
};

export default SearchResults;
