import InsightWrapper from "./insightWrapper";
import { fetchTaxesEntries } from "@/actions/entries.actions";
import InsightServerError from "./insightServerError";
import { MAIN_CURRENCY, VAT_PERCENTAGE } from "@/constants";

const Taxes = async () => {
   const title = "Taxes estimates";
   const res = await fetchTaxesEntries();
   if (!res.ok) return <InsightServerError title={title} />;

   const entries = res.data.entries;
   const vat = (
      entries.reduce((acc, entry) => acc + entry.amount, 0) * VAT_PERCENTAGE
   ).toLocaleString();
   const months = res.data.months;
   return (
      <InsightWrapper title={`Taxes estimates`}>
         <div className="stats w-full shadow">
            <div className="stat">
               <div className="stat-title">{`VAT ${months}`}</div>
               <div className="stat-value text-2xl">{vat + MAIN_CURRENCY}</div>
            </div>
         </div>
      </InsightWrapper>
   );
};

export default Taxes;
