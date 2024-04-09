import RegisterBtn from "@/components/navs/registerBtn";
import SignInBtn from "@/components/navs/signInBtn";
import { getDictionary } from "@/lib/dictionary";

const Welcome = async ({ params: { lang } }) => {
   const { welcome, common } = await getDictionary(lang);
   const text = ` Welcome to our income and expense management application!
   <br />
   We're thrilled to have you here and excited to help you take
   control of your finances. <br /> <br />
   If you're tired of having no idea what's coming in or out, and
   you're looking to make order in your business, you're in the
   right place!`;
   const greeting = { __html: welcome.greeting };
   return (
      <section className="grid justify-items-center w-full h-full overflow-auto">
         <div className="my-auto shadow-lg h-fit md:w-3/4 grid md:grid-cols-12 place-items-center gap-1 p-5">
            <div className="col-span-7">
               <h1 className="text-3xl text-center">{welcome.title}</h1>
               <div className="p-3 md:w-3/4"></div>
               <p dangerouslySetInnerHTML={greeting}></p>
            </div>

            <div className="divider divider-horizontal col-auto hidden md:flex"></div>

            <div className="grid place-items-center gap-3 h-full col-span-12 md:col-span-4 md:text-center">
               <div className="divider w-full md:hidden"></div>

               <div className="grid grid-cols-2 gap-3 mt-auto">
                  <SignInBtn text={common} />
                  <RegisterBtn text={common} />
               </div>
               <div className="divider w-full md:hidden"></div>
               <p>{welcome.demoText}</p>
               <button className="btn btn-primary">Click here</button>
            </div>
         </div>
      </section>
   );
};

export default Welcome;
