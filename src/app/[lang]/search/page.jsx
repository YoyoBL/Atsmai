import { searchEntries } from "@/actions/entries.actions";
import Search from "@/components/search/search";

import { redirect } from "next/navigation";

const SearchPage = ({ params: { lang }, searchParams }) => {
   const currentPath = `/${lang}/search`;
   const entryType = searchParams.entryType;
   if (!entryType) return redirect(currentPath + "?entryType=incomes");

   return (
      <section className="h-full">
         <div className="card bg-base-200 card-compact w-96 max-h-full">
            <Search />
         </div>
      </section>
   );
};

export default SearchPage;
