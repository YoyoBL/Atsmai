import { fetchEntries } from "@/actions/entries.actions copy";
import InsightWrapper from "./insightWrapper";
import { fetchTaxesEntries } from "@/actions/entries.actions";
import InsightServerError from "./insightServerError";
import { MAIN_CURRENCY } from "@/constants";

const Taxes = async () => {
   const title = "Taxes estimates";
   const res = await fetchTaxesEntries();
   if (!res.ok) return <InsightServerError title={title} />;
   const vat = res.data.vat.amount.toLocaleString();
   const months = res.data.vat.months;
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
