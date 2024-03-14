import { fetchThreeLast } from "@/actions";
import { formatDate } from "@/lib/dates";
import { Bar } from "@/lib/imports";

const ExpandedEntry = async ({ entry }) => {
   const entries = await fetchThreeLast(entry);
   const data = {
      labels: entries.map((entry) => formatDate(entry.date, "dd/MM")),
      datasets: [
         {
            label: "Amount",
            data: entries.map((entry) => entry.amount),
            maxBarThickness: 20,
         },
      ],
   };

   if (!entry?._id) return;
   const { amount, category } = entry;
   const date = formatDate(entry.date, "dd/MM");
   return (
      <div className="">
         <div className="bg-primary text-white flex flex-wrap justify-around items-center font-light p-4 rounded-t-xl">
            <div> {category}</div>
            <div className="text-3xl ">{amount}</div>
            <div> {date}</div>
            <div className="divider w-full text-xs text-base-content">
               Notes
            </div>
            <div className="">Some Notes</div>
         </div>
         <div className="flex justify-evenly p-3 text-white font-light"></div>

         {/* Collapse */}
         <div className="card">
            <div className="card-body">
               <div className="divider text-lg">Last 3</div>
               <Bar data={data} />
            </div>
         </div>
      </div>
   );
};

export default ExpandedEntry;
