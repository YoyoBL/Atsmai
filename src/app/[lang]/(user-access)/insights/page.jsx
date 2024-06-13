import { auth } from "@/auth";
import UnderWork from "@/components/insights/UnderWork";
import CurrentMonthBalance from "@/components/insights/currentMonthBalance";
import LastMonthsChart from "@/components/insights/lastMonthsChart";

import Taxes from "@/components/insights/taxes";
import { getDictionary } from "@/lib/dictionary";
import dynamic from "next/dynamic";

// const LastMonthsChart = dynamic(
//    () => import("@/components/insights/lastMonthsChart"),
//    {
//       ssr: false,
//    }
// );

const InsightsPage = async ({ params: { lang } }) => {
   const { user } = await auth();
   const isVat = user.vat;
   const { insights, common, months } = await getDictionary(lang);
   const text = { ...insights, ...common, months };
   return (
      <section className="h-full w-full overflow-auto">
         <div className="card card-compact ">
            <div className="card-body  gap-3 overflow-hidden">
               <div className="card-title">{text.title}</div>
               <div className="grid md:flex md:items-center md:flex-wrap gap-3">
                  {/* taxes */}
                  {isVat && (
                     <Taxes
                        text={{
                           ...text.taxesEstimates,
                           vat: text.vat,
                           months: text.months,
                        }}
                     />
                  )}
                  <CurrentMonthBalance text={text} />
                  <LastMonthsChart />
               </div>
               <UnderWork />
            </div>
         </div>
      </section>
   );
};

export default InsightsPage;
