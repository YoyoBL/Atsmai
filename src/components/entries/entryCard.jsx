import { formatDate } from "@/lib/dates";

const EntryCard = ({ entry = {} }) => {
   if (!entry.amount) return;
   const { amount, category } = entry;
   const date = formatDate(entry.date, "dd/MM");
   return (
      <div className="card bg-base-200 px-3">
         <div className="p-3 flex flex-row justify-between items-center">
            <div className="text-base">{amount}</div>
            <div className="text-gray-500">{category}</div>
            <div className="text-gray-600 text-xs">{date}</div>
         </div>
      </div>
   );
};

export default EntryCard;
