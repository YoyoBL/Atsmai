import { fetchEntries } from "@/actions/entries.actions";
import EntryCard from "@/components/entries/entryCard";
import Modal from "@/components/common/modal";
import MonthsPicker from "@/components/entries/monthsPicker";
import TotalAmount from "@/components/entries/totalAmount";
import { getDictionary } from "@/lib/dictionary";
import { redirect } from "next/navigation";
import ExpandedEntry from "@/components/entries/expandedEntry";
import { getRecurringExpenses } from "@/actions/recurringExpense.actions";
import FutureExpenses from "@/components/entries/futureExpenses";
import { format, isAfter, isSameMonth, parse, startOfMonth } from "date-fns";
import ConfirmModal from "@/components/common/confirmModal";
import { protectedLinks } from "@/lib/routes";
import { today } from "@/lib/dates";

export default async function EntriesPage({ params: { lang }, searchParams }) {
   const { entriesPage, months } = await getDictionary(lang);

   const entriesType = searchParams?.entriesType;
   if (!entriesType) redirect(`/${lang}/${protectedLinks.entries.href}`);

   const date = searchParams?.month;
   if (!date) redirect(`/${lang}/?entriesType=${entriesType}&month=current`);

   const parsedDate =
      date === "current" ? today : parse(date, "MM-yy", new Date());

   const isExpensesPage = entriesType === "expenses";
   let recurringExpenses = [];

   const isPast = isAfter(startOfMonth(new Date()), parsedDate);
   if (isExpensesPage && !isPast) {
      const res = await getRecurringExpenses();
      if (!res.ok) return console.log(res.data);
      const filterByDate = (v) => {
         const recurringDate = new Date(v.nextOccurrence);
         return isSameMonth(recurringDate, parsedDate);
      };
      recurringExpenses = res.data.filter(filterByDate);
   }

   let entries = [];
   const res = (await fetchEntries(entriesType, parsedDate)) || [];
   if (!res.ok) return;
   entries = res.data;
   function getExpandedEntry() {
      if (!searchParams?.modal) return;

      const id = searchParams.modal;
      const entry = entries.find((entry) => entry._id === id);
      if (!entry) return;
      entry.entryType =
         searchParams.entriesType === "incomes" ? "income" : "expense";
      return entry;
   }

   const showFutureExpenses =
      isExpensesPage && !!recurringExpenses.length && !isPast;

   return (
      <section className="h-full w-full flex justify-center">
         <div className="card bg-base-200 card-compact md:w-96 w-full h-fit max-h-full">
            <div className="card-body overflow-hidden">
               <div className="card-title">{entriesPage.header}</div>

               {/* Top */}
               <TotalAmount
                  entries={entries}
                  entriesType={entriesType}
                  lang={lang}
               />

               {/* Dates dort */}
               <MonthsPicker months={months} />

               {/* Entries */}
               <div className="card p-2 pb-0 bg-base-300 overflow-hidden ">
                  <div className="space-y-2 overflow-auto pb-2">
                     {showFutureExpenses && (
                        <FutureExpenses recurring={recurringExpenses} />
                     )}
                     {entries.map((entry) => (
                        <EntryCard entry={entry} key={entry?._id} />
                     ))}
                  </div>
                  <div className="absolute bottom-0 left-0  w-full h-5 bg-gradient-to-t from-black opacity-10 pointer-events-none"></div>
               </div>
               {/* Modal */}

               <Modal>
                  <ExpandedEntry entry={getExpandedEntry()} />
               </Modal>

               <ConfirmModal confirmBtn="Delete" message="Delete this entry?" />
            </div>
         </div>
      </section>
   );
}
