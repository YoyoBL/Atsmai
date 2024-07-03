import { auth } from "@/auth";
import UnderWork from "@/components/insights/UnderWork";
import CurrentMonthBalance from "@/components/insights/currentMonthBalance";
import LastMonthsChart from "@/components/insights/lastMonthsChart";

import Taxes from "@/components/insights/taxes";
import { getDictionary } from "@/lib/dictionary";
import dynamic from "next/dynamic";

const InsightsPage = async ({ params: { lang } }) => {
   const { user } = await auth();
   const isVat = user.vat;
   const { insights, common, months } = await getDictionary(lang);
   const text = { ...insights, ...common, months };

   return (
      <section className="h-full w-full max-w-5xl overflow-auto">
         <div className="card card-compact ">
            <div className="card-body  gap-3 overflow-hidden">
               <div className="card-title">{text.title}</div>
               <div className="grid md:flex md:items-center md:flex-wrap gap-3">
                  {/* taxes */}

                  {isVat && (
                     <div className="flex-1">
                        <Taxes
                           text={{
                              ...text.taxesEstimates,
                              vat: text.vat,
                              months: text.months,
                           }}
                        />
                     </div>
                  )}
                  <div className="flex-1">
                     <CurrentMonthBalance text={text} />
                  </div>
                  <div className="basis-full">
                     <LastMonthsChart />
                  </div>
               </div>
               <UnderWork />
            </div>
         </div>
      </section>
   );
};

export default InsightsPage;
