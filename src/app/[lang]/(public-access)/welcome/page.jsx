import { auth } from "@/auth";
import RegisterBtn from "@/components/navs/registerBtn";
import SignInBtn from "@/components/navs/signInBtn";
import { i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import SeedCard from "@/seed/seedCard";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}

const Welcome = async ({ params: { lang } }) => {
   const { welcome } = await getDictionary(lang);
   const isDevelopment = process.env.NODE_ENV === "development";

   const session = await auth();
   if (session) return redirect(`/${lang}/`);

   const greeting = { __html: welcome.greeting };
   return (
      <section className="flex flex-col items-center justify-center gap-3 w-full h-full overflow-auto">
         {isDevelopment && <SeedCard />}
         <div className="bg-base-200 rounded-xl shadow-lg h-fit md:w-3/4 grid md:grid-cols-12 place-items-center gap-1 p-5">
            <div className="col-span-7">
               <h1 className="text-3xl text-center">{welcome.title}</h1>
               <div className="p-3 md:w-3/4"></div>
               <p dangerouslySetInnerHTML={greeting}></p>
            </div>

            <div className="divider divider-horizontal col-auto hidden md:flex"></div>

            <div className="grid place-items-center gap-3 border-t-2 border-gray-700 md:border-t-0 w-full h-full col-span-12 md:col-span-4 md:text-center mt-3">
               <div className="grid grid-cols-2 gap-3 mt-auto p-4 md:my-auto">
                  <SignInBtn />
                  <RegisterBtn />
               </div>
            </div>
         </div>
      </section>
   );
};

export default Welcome;
