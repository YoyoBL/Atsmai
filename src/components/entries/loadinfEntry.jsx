import useQueryParams from "@/hooks/useQueryParams";
import cn from "@/lib/tailwindMerge";

const LoadingEntry = () => {
   const { getQueryByName } = useQueryParams();
   const isIncome = getQueryByName("entryType") === "income";
   return (
      <div className="w-full h-96 grid place-items-center">
         <span
            className={cn(
               "loading loading-spinner loading-lg",
               isIncome ? "text-primary" : "text-secondary"
            )}
         ></span>
      </div>
   );
};

export default LoadingEntry;
