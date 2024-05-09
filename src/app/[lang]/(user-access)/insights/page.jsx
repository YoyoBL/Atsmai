import Taxes from "@/components/insights/taxes";

const InsightsPage = () => {
   return (
      <section className="h-full w-full overflow-auto">
         <div className="card card-compact ">
            <div className="card-body  gap-3 overflow-hidden">
               <div className="card-title">Insights</div>
               {/* taxes */}
               <Taxes />
            </div>
         </div>
      </section>
   );
};

export default InsightsPage;
