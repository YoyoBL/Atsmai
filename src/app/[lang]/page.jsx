import { fetchEntries } from "@/actions";
import EntryCard from "@/components/entries/entryCard";
import MonthsPicker from "@/components/entries/monthsPicker";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({ params: { lang }, searchParams }) {
   const { page } = await getDictionary(lang);

   const entriesType = searchParams.entriesType;
   if (!entriesType) redirect(`/${lang}/?entriesType=incomes`);

   const month = searchParams?.month;

   const entries = await fetchEntries(entriesType, month);

   return (
      <section className="h-full">
         <div className="card bg-base-200 card-compact w-96 max-h-full">
            <div className="card-body overflow-hidden">
               <div className="card-title">Entries</div>

               {/* Top */}
               <div className="">
                  <div className="grid grid-cols-2 text-center text-lg">
                     <Link
                        href=""
                        className="p-2 bg-primary rounded-t-xl text-base-300"
                     >
                        Incomes
                     </Link>

                     <Link href="" className="p-2 ">
                        Expenses
                     </Link>
                  </div>
                  <div className="bg-primary rounded-xl rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none h-36 flex flex-col justify-center items-center gap-3 shadow">
                     <div className="text-5xl font-light">5000$</div>
                     <div className="flex w-full justify-evenly">
                        <div className="card bg-base-100 bg-opacity-70 w-28">
                           <div className="p-2 text-xs text-center">
                              <div>VAT</div>
                              <div>325</div>
                           </div>
                        </div>
                        <div className="card bg-base-100 bg-opacity-70 w-28">
                           <div className="p-2 text-xs text-center">
                              <div>TAX</div>
                              <div>150</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Dates dort */}
               <MonthsPicker />

               {/* Entries */}
               <div className="card p-2 pb-0 bg-base-300 overflow-hidden ">
                  <div className="space-y-2 overflow-auto">
                     {entries.map((entry) => (
                        <EntryCard entry={entry} key={entry?._id} />
                     ))}
                  </div>
                  <div className="absolute bottom-0 left-0  w-full h-16 bg-gradient-to-t from-black opacity-30"></div>
               </div>
            </div>
         </div>
      </section>
   );
}
