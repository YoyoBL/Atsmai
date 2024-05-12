import RegisterForm from "@/components/register/registerForm";
import { i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}

const RegisterPage = async ({ params: { lang } }) => {
   const { register } = await getDictionary(lang);
   return (
      <section>
         <div className="card w-96 bg-base-200 shadow-xl overflow-auto">
            <div className="card-body">
               <h2 className="card-title">{register.title}</h2>

               {/* Register Form */}
               <RegisterForm text={register} />
            </div>
         </div>
      </section>
   );
};

export default RegisterPage;
