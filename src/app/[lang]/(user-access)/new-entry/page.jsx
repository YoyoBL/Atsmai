import BackBtn from "@/components/common/backBtn";
import NewEntryForm from "@/components/new-entry/newEntryForm";
import { getDictionary } from "@/lib/dictionary";

export default async function newEntryPage({ params: { lang } }) {
   const { page } = await getDictionary(lang);

   return (
      <section>
         <div className="card bg-base-200 card-compact w-96 overflow-auto">
            <div className="card-body">
               <div className="card-title">
                  <BackBtn />
                  New Entry
               </div>
               <NewEntryForm />
            </div>
         </div>
      </section>
   );
}
