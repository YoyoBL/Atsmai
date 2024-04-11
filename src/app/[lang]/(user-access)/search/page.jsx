import SearchForm from "@/components/search/searchForm";
import SearchResults from "@/components/search/searchResults";
import { getDictionary } from "@/lib/dictionary";

import { redirect } from "next/navigation";

const SearchPage = async ({ params: { lang }, searchParams }) => {
   const { search, common } = await getDictionary(lang);
   const text = { ...search, ...common };
   const currentPath = `/${lang}/search`;
   const entryType = searchParams.entryType;
   if (!entryType) return redirect(currentPath + "?entryType=incomes");

   return (
      <section className="h-full overflow-auto">
         <div className="card bg-base-200 card-compact md:w-96 max-h-full">
            <div className="card-body gap-3 overflow-hidden">
               <div className="card-title">{text.title}</div>
               <SearchForm text={text} />
               <SearchResults searchParams={searchParams} text={text} />
            </div>
         </div>
      </section>
   );
};

export default SearchPage;
