import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import InsightWrapper from "./insightWrapper";

const UnderWork = () => {
   return (
      <InsightWrapper title="More insights are cooked">
         <p className="text-base">
            Graphs for the previous months and more, its all planned! Stay
            tuned.
         </p>
         <div className="flex justify-center py-4">
            <Cog6ToothIcon className="size-10 animate-pulse" />
         </div>
      </InsightWrapper>
   );
};

export default UnderWork;
