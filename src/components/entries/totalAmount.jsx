import Link from "next/link";
import TaxCard from "./taxCard";
import cn from "@/lib/tailwindMerge";
import { getTheme } from "@/actions/theme.actions";
import { getDictionary } from "@/lib/dictionary";
import Tabs from "./tabs";

const TotalAmount = async ({
   entries = [],
   date = "",
   entriesType = "",
   lang = "he",
}) => {
   const { entriesPage } = await getDictionary(lang);

   const theme = (await getTheme()) || "dark";
   const totalAmount = entries.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
   );

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
         <Tabs text={entriesPage} />
         <div
            className={cn(
               "bg-primary rounded-xl h-36 flex flex-col justify-center items-center gap-3",
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
