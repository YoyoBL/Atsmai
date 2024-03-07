import Link from "next/link";
import TaxCard from "./taxCard";
import { getTheme } from "@/actions";
import cn from "@/lib/tailwindMerge";

const TotalAmount = async ({ entries = [], date = "", entriesType = "" }) => {
   const theme = (await getTheme()) || "dark";
   const totalAmount = entries.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
   );

   console.log(entriesType);

   return (
      <div
         // theme based on entry type
         data-theme={
            entriesType === "incomes"
               ? theme === "dark"
                  ? "dark"
                  : "light"
               : theme === "dark"
               ? "darkExpenses"
               : "lightExpenses"
         }
      >
         <div className="grid grid-cols-2 text-center text-lg">
            <Link
               href="/en?entriesType=incomes"
               className={cn("p-2 bg-base-200", {
                  "bg-primary rounded-t-xl text-white":
                     entriesType === "incomes",
               })}
            >
               Incomes
            </Link>

            <Link
               href="/en?entriesType=expenses"
               className={cn("p-2 bg-base-200", {
                  "bg-primary rounded-t-xl text-white":
                     entriesType === "expenses",
               })}
            >
               Expenses
            </Link>
         </div>
         <div
            className={cn(
               "bg-primary rounded-xl h-36 flex flex-col justify-center items-center gap-3 shadow",
               {
                  "rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none":
                     entriesType === "incomes",
                  "rounded-tr-none rtr:rounded-tr-xl rtr:rounded-tr-none":
                     entriesType === "expenses",
               }
            )}
         >
            <div className="text-5xl font-light text-white">{totalAmount}</div>

            <div className="flex w-full justify-evenly">
               <TaxCard
                  date={date}
                  entries={entries}
                  taxPercent={0.17}
                  taxName="VAT"
               />

               <TaxCard
                  date={date}
                  entries={entries}
                  taxPercent={0.05}
                  taxName="TAX"
               />
            </div>
         </div>
      </div>
   );
};

export default TotalAmount;
