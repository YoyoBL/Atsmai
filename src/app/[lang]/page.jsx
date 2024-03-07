import { fetchEntries } from "@/actions";
import EntryCard from "@/components/entries/entryCard";
import MonthsPicker from "@/components/entries/monthsPicker";
import TotalAmount from "@/components/entries/totalAmount";
import { getDictionary } from "@/lib/dictionary";
import { redirect } from "next/navigation";

export default async function Home({ params: { lang }, searchParams }) {
   const { page } = await getDictionary(lang);

   const entriesType = searchParams.entriesType;
   if (!entriesType) redirect(`/${lang}/?entriesType=incomes`);

   const date = searchParams?.month;

   const entries = await fetchEntries(entriesType, date);

   return (
      <section className="h-full">
         <div className="card bg-base-200 card-compact w-96 max-h-full">
            <div className="card-body overflow-hidden">
               <div className="card-title">Entries</div>

               {/* Top */}
               <TotalAmount
                  entries={entries}
                  date={date}
                  entriesType={entriesType}
               />

               {/* Dates dort */}
               <MonthsPicker />

               {/* Entries */}
               <div className="card p-2 pb-0 bg-base-300 overflow-hidden ">
                  <div className="space-y-2 overflow-auto pb-2">
                     {entries.map((entry) => (
                        <EntryCard entry={entry} key={entry?._id} />
                     ))}
                  </div>
                  <div className="absolute bottom-0 left-0  w-full h-5 bg-gradient-to-t from-black opacity-10"></div>
               </div>
            </div>
         </div>
      </section>
   );
}
