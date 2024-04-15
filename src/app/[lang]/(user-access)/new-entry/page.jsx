import BackBtn from "@/components/common/backBtn";
import NewEntryForm from "@/components/new-entry/newEntryForm";
import { i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}
export default async function newEntryPage({ params: { lang } }) {
   const { newEntry, common } = await getDictionary(lang);
   const text = { ...common, ...newEntry };

   return (
      <section>
         <div className="card bg-base-200 card-compact w-96 overflow-auto">
            <div className="card-body">
               <div className="card-title">
                  <BackBtn />
                  {newEntry.title}
               </div>
               <NewEntryForm text={text} />
            </div>
         </div>
      </section>
   );
}
