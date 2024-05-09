import { fetchTaxesEntries } from "@/actions/entries.actions";
import { MAIN_CURRENCY, VAT_PERCENTAGE } from "@/constants";
import { getEndOfMonth, getStartOfMonth } from "@/lib/dates";

const Taxes = async ({ entries, entriesType }) => {
   const res = await fetchTaxesEntries();
   if (!res.ok) return null;
   const vat =
      res.data.entries
         .filter(
            (entry) =>
               entry.date > getStartOfMonth() && entry.date < getEndOfMonth()
         )
         .reduce((acc, entry) => acc + entry.amount, 0) * VAT_PERCENTAGE;
   const total = entries
      .filter((entry) => !entry?.vatExempt)
      .reduce((total, entry) => total + entry.amount, 0);
   const isIncomes = entriesType === "incomes";
   const includingVat = isIncomes ? total - vat : total + vat;
   return (
      <div className="w-full bg-black bg-opacity-30 py-2 bg-blend-overlay">
         <div className="flex text-white text-opacity-70">
            <div className="flex justify-center items-center gap-2 flex-1">
               <div className="text-xs">VAT:</div>
               <div>{vat.toLocaleString() + MAIN_CURRENCY}</div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex justify-center items-center gap-2 flex-1">
               <div className="text-xs">Total:</div>
               <div>{includingVat.toLocaleString() + MAIN_CURRENCY}</div>
            </div>
         </div>
      </div>
   );
};

export default Taxes;
