import RegisterForm from "@/components/register/registerForm";
import { getDictionary } from "@/lib/dictionary";

const RegisterPage = async ({ params: { lang } }) => {
   const { register } = await getDictionary(lang);
   return (
      <section>
         <div className="card w-96 bg-base-100 shadow-xl overflow-auto">
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
