import { auth } from "@/auth";
import UnderWork from "@/components/insights/UnderWork";
import CurrentMonthBalance from "@/components/insights/currentMonthBalance";
import Taxes from "@/components/insights/taxes";
import { getDictionary } from "@/lib/dictionary";

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
               <div className="grid md:flex md:items-center gap-3">
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
               </div>
               <UnderWork />
            </div>
         </div>
      </section>
   );
};

export default InsightsPage;
