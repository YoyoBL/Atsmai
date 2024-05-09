import TaxCard from "./taxCard";
import cn from "@/lib/tailwindMerge";
import { getDictionary } from "@/lib/dictionary";
import Tabs from "./tabs";
import { auth } from "@/auth";
import Taxes from "./taxes";

const TotalAmount = async ({
   entries = [],
   date = "",
   entriesType = "",
   lang = "he",
}) => {
   const { entriesPage } = await getDictionary(lang);
   const { user } = auth();

   const totalAmount = entries.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
   );

   return (
      <div>
         <Tabs text={entriesPage} />
         <div
            className={cn(
               "rounded-xl h-36 flex flex-col justify-center items-center gap-2 overflow-hidden",
               {
                  "bg-primary rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none":
                     entriesType === "incomes",
                  "bg-secondary rounded-tr-none rtl:rounded-tl-none rtl:rounded-tr-xl":
                     entriesType === "expenses",
               }
            )}
         >
            <div className=" flex-1 grid place-items-center">
               <span className="text-5xl font-light text-white">
                  {totalAmount.toLocaleString()}
               </span>
            </div>
         </div>
      </div>
   );
};

export default TotalAmount;
