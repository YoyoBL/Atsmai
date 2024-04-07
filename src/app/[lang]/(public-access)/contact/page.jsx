import ContactForm from "@/components/contact/contactForm";

const Contact = () => {
   return (
      <section className="grid place-items-center w-full h-full">
         <div className="card bg-base-200">
            <div className="card-body">
               <div className="card-title text-3xl justify-center">Contact</div>
               <ContactForm />
            </div>
         </div>
      </section>
   );
};

export default Contact;
