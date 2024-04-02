import RegisterForm from "@/components/register/registerForm";

const RegisterPage = () => {
   return (
      <section>
         <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
               <h2 className="card-title">Register</h2>

               {/* Register Form */}
               <RegisterForm />
            </div>
         </div>
      </section>
   );
};

export default RegisterPage;
