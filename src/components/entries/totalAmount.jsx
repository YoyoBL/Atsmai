import Link from "next/link";
import TaxCard from "./taxCard";

const TotalAmount = ({ entries = [], date = "" }) => {
   const totalAmount = entries.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
   );

   return (
      <div className="">
         <div className="grid grid-cols-2 text-center text-lg">
            <Link href="" className="p-2 bg-primary rounded-t-xl text-white">
               Incomes
            </Link>

            <Link href="" className="p-2 ">
               Expenses
            </Link>
         </div>
         <div className="bg-primary rounded-xl rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none h-36 flex flex-col justify-center items-center gap-3 shadow">
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
