import BackBtn from "@/components/common/backBtn";
import NewEntryForm from "@/components/new-entry/newEntryForm";
import { getDictionary } from "@/lib/dictionary";

export default async function newEntryPage({
   params: { lang },
   searchParams: { edit },
}) {
   const { newEntry, common } = await getDictionary(lang);
   const text = { ...common, ...newEntry };
   const title = edit ? newEntry.editTitle : newEntry.title;

   return (
      <section>
         <div className="card bg-base-200 card-compact w-96 overflow-auto">
            <BackBtn className="p-3" />
            <div className="card-body">
               <div className="card-title">{title}</div>
               <NewEntryForm text={text} />
            </div>
         </div>
      </section>
   );
}
