import { getCurrentMonthString } from "@/lib/dates";
import InsightWrapper from "./insightWrapper";
import { fetchEntries } from "@/actions/entries.actions";

const CurrentMonthBalance = async ({ text }) => {
   const currentMonthString = getCurrentMonthString();
   const { data: incomes } = await fetchEntries("incomes");
   const { data: expenses } = await fetchEntries("expenses");

   const totalIncomes = calculateTotal(incomes);
   const totalExpenses = calculateTotal(expenses);
   const profit = totalIncomes - totalExpenses;

   function calculateTotal(entryType) {
      return entryType.reduce((total, entry) => total + entry.amount, 0);
   }

   return (
      <InsightWrapper
         title={text.balance + " " + text.months[currentMonthString]}
      >
         {/* totals */}
         <div className="stats  w-full">
            <div className="stat place-items-center p-3 ">
               <div className="stat-value text-xl  text-primary">
                  {totalIncomes.toLocaleString()}
               </div>
               <div className="stat-desc text-primary">{text.incomes}</div>
            </div>

            <div className="stat place-items-center p-3">
               <div className="stat-value text-xl text-secondary">
                  {totalExpenses.toLocaleString()}
               </div>
               <div className="stat-desc text-secondary">{text.expenses}</div>
            </div>

            <div className="stat place-items-center p-3">
               <div className="stat-value text-xl">
                  {profit.toLocaleString()}
               </div>
               <div className="stat-desc">{text.profit}</div>
            </div>
         </div>
      </InsightWrapper>
   );
};

export default CurrentMonthBalance;
