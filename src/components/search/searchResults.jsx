import { searchEntries } from "@/actions/entries.actions";
import EntryCard from "../entries/entryCard";
import Modal from "../common/modal";
import ExpandedEntry from "../entries/expandedEntry";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const SearchResults = async ({
   searchParams = { entryType: "", searchValue: "", modal: "" },
}) => {
   const searchValue = searchParams?.searchValue;
   if (!searchValue) return null;
   const entryType = searchParams.entryType;

   let serverError = "";
   const res = await searchEntries(entryType, searchValue);
   if (!res.ok) serverError = res.data;
   const searchResults = res.data;
   console.log("hello", searchResults);

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
         <div className="space-y-2 bg-base-300 rounded-xl p-3">
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
      </>
   );
};

export default SearchResults;
