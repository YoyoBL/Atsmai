import NewEntryForm from "@/components/new-entry/newEntryForm";
import { getDictionary } from "@/lib/dictionary";

export default async function newEntryPage({ params: { lang } }) {
   const { page } = await getDictionary(lang);

   return (
      <section>
         <div className="card bg-base-200 card-compact">
            <div className="card-body">
               <div className="card-title">New Entry</div>
               <NewEntryForm />
            </div>
         </div>
      </section>
   );
}
