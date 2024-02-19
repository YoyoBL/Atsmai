import EntryDatesPicker from "@/components/entryDatesPicker";
import Tabs from "@/components/tabs";
import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params: { lang } }) {
   const { page } = await getDictionary(lang);
   return (
      <section>
         <div className="card bg-base-200 card-compact">
            <div className="card-body">
               <div className="card-title">New Entry</div>
               <form action="#">
                  <div className="flex flex-col gap-3">
                     {/* Amount */}
                     <input
                        type="text"
                        placeholder="Amount"
                        className="input input-bordered input-primary w-full max-w-xs"
                     />

                     {/* income | expense */}
                     <Tabs />

                     {/* date */}
                     <EntryDatesPicker />
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
}
