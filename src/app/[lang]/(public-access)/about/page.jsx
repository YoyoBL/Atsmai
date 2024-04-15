import RegisterBtn from "@/components/navs/registerBtn";
import SignInBtn from "@/components/navs/signInBtn";
import { i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}

const About = async ({ params: { lang } }) => {
   const { about } = await getDictionary(lang);
   const { headers, content } = about;

   const featuresList = content.whatCanAtsmaiDo.featuresList;

   return (
      <section className="grid justify-items-center w-full p-3 overflow-auto">
         <div className="card bg-base-200 h-fit">
            <div className="card-body ">
               <h1 className="card-title text-3xl justify-center">
                  {about.title}
               </h1>
               <ul className="space-y-3">
                  <li>
                     <h2 className="text-xl divider divider-start">
                        {headers.whatWeAre}
                     </h2>
                     {content.whatWeAre}
                  </li>
                  <li>
                     <h2 className="text-xl divider divider-start">
                        {headers.whyAtsmai}
                     </h2>
                     {content.whyAtsmai}
                  </li>
                  <li>
                     <h2 className="text-xl divider divider-start">
                        {headers.whatCanAtsmaiDo}
                     </h2>
                     <ul style={{ listStyleType: "initial" }}>
                        <h3 className="text-lg">{content.keyFeatures}</h3>
                        {featuresList.map((feature, index) => (
                           <li key={index}>{feature}</li>
                        ))}
                     </ul>
                  </li>
                  <li>
                     <h2 className="text-xl divider divider-start">
                        {headers.soundsGood}
                     </h2>
                     {content.soundsGood}
                     <div className="mt-3 flex gap-3">
                        <SignInBtn />
                        <RegisterBtn />
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </section>
   );
};

export default About;
