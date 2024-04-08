import SearchForm from "@/components/search/searchForm";
import SearchResults from "@/components/search/searchResults";

import { redirect } from "next/navigation";

const SearchPage = ({ params: { lang }, searchParams }) => {
   const currentPath = `/${lang}/search`;
   const entryType = searchParams.entryType;
   if (!entryType) return redirect(currentPath + "?entryType=incomes");

   return (
      <section className="h-full">
         <div className="card bg-base-200 card-compact md:w-96 max-h-full">
            <div className="card-body gap-3">
               <div className="card-title">Search Entries</div>
               <SearchForm />
               <SearchResults searchParams={searchParams} />
            </div>
         </div>
      </section>
   );
};

export default SearchPage;
