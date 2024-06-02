import InsightWrapper from "./insightWrapper";
import { fetchTaxesEntries } from "@/actions/entries.actions";
import InsightServerError from "./insightServerError";
import { MAIN_CURRENCY, VAT_PERCENTAGE } from "@/constants";
import { getDictionary } from "@/lib/dictionary";

const Taxes = async ({ text }) => {
   const res = await fetchTaxesEntries();
   if (!res.ok) return <InsightServerError title={title} />;

   const entries = res.data.entries;
   const vat = (
      entries.reduce((acc, entry) => acc + entry.amount, 0) * VAT_PERCENTAGE
   ).toLocaleString();

   const months = res.data.months;
   const formattedMonths = `${text.months[months[0]]} -  ${
      text.months[months[1]]
   }`;
   return (
      <InsightWrapper title={text.title}>
         <div className="stats shadow">
            <div className="stat">
               <div className="stat-title">{`${text.vat} ${formattedMonths}`}</div>
               <div className="stat-value text-2xl">{vat + MAIN_CURRENCY}</div>
            </div>
         </div>
      </InsightWrapper>
   );
};

export default Taxes;
