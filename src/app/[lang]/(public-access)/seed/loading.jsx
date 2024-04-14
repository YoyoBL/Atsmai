import { seedInitialData } from "@/seed/seed.actions";
import { redirect } from "next/navigation";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const SeedLoading = () => {
   if (process.env.NODE_ENV !== "development") redirect("/");

   return (
      <section className="p-3 w-full">
         <div
            dir="ltr"
            role="alert"
            className="alert alert-success h-fit max-w-md mx-auto flex justify-center"
         >
            <Cog6ToothIcon className="size-7 animate-spin" />
         </div>
      </section>
   );
};

export default SeedLoading;
