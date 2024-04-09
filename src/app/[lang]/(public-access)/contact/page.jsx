import ContactForm from "@/components/contact/contactForm";
import { getDictionary } from "@/lib/dictionary";

const Contact = async ({ params: { lang } }) => {
   const { contact } = await getDictionary(lang);
   return (
      <section className="grid place-items-center w-full h-full overflow-auto">
         <div className="card bg-base-200">
            <div className="card-body">
               <div className="card-title text-3xl justify-center">
                  {contact.title}
               </div>
               <ContactForm text={contact} />
            </div>
         </div>
      </section>
   );
};

export default Contact;
