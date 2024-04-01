import { fetchEntries } from "@/actions";
import EntryCard from "@/components/entries/entryCard";
import Modal from "@/components/common/modal";
import MonthsPicker from "@/components/entries/monthsPicker";
import TotalAmount from "@/components/entries/totalAmount";
import { getDictionary } from "@/lib/dictionary";
import { redirect } from "next/navigation";
import ExpandedEntry from "@/components/entries/expandedEntry";
import { getRecurringExpenses } from "@/actions/recurringExpense.action";
import FutureExpenses from "@/components/entries/futureExpenses";
import { isAfter, parse, startOfMonth } from "date-fns";

export default async function Home({ params: { lang }, searchParams }) {
   const { page } = await getDictionary(lang);

   const entriesType = searchParams.entriesType;
   if (!entriesType) redirect(`/${lang}/?entriesType=incomes`);

   const isExpensesPage = entriesType === "expenses";
   let recurringExpenses = [];
   const date = searchParams?.month;

   if (isExpensesPage) {
      const res = await getRecurringExpenses();
      if (!res.ok) return console.log(res.data);
      recurringExpenses = res.data;
   }
   const entries = await fetchEntries(entriesType, date);

   function getExpandedEntry() {
      if (!searchParams?.modal) return;

      const id = searchParams.modal;
      const entry = entries.find((entry) => entry._id === id);
      if (!entry) return;
      entry.entryType =
         searchParams.entriesType === "incomes" ? "income" : "expense";
      return entry;
   }

   const isPast = isAfter(
      startOfMonth(new Date()),
      parse(date, "MM-yy", new Date())
   );

   const showFutureExpenses =
      isExpensesPage && !!recurringExpenses.length && !isPast;

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
                     {showFutureExpenses && (
                        <FutureExpenses recurring={recurringExpenses} />
                     )}
                     {entries.map((entry) => (
                        <>
                           <EntryCard entry={entry} key={entry?._id} />
                        </>
                     ))}
                  </div>
                  <div className="absolute bottom-0 left-0  w-full h-5 bg-gradient-to-t from-black opacity-10 pointer-events-none"></div>
               </div>
               {/* Modal */}
               {
                  <Modal>
                     <ExpandedEntry entry={getExpandedEntry()} />
                  </Modal>
               }
            </div>
         </div>
      </section>
   );
}
