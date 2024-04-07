import RegisterBtn from "@/components/navs/registerBtn";
import SignInBtn from "@/components/navs/signInBtn";

const About = () => {
   return (
      <section className="grid justify-items-center w-full h-full">
         <div className="card bg-base-200">
            <div className="card-body">
               <h1 className="card-title text-3xl justify-center">About</h1>
               <ul className="space-y-3">
                  <li>
                     <h2 className="text-xl divider divider-start">
                        What are we
                     </h2>
                     Atsmai is an income and expenses manager. Atsmai is
                     intended for the small businesses to give you control over
                     you're cash traffic. No more second guessing, know exactly
                     what to expect and where do you stand.
                  </li>
                  <li>
                     <h2 className="text-xl divider divider-start">
                        Why Atsmai
                     </h2>
                     Atsmai was crafted while always keeping in mind simplicity
                     and user friendly experience. Its made for you to be able
                     to enjoy and relax and have a clear view of what is going
                     on in your business.
                  </li>
                  <li>
                     <h2 className="text-xl divider divider-start">
                        What can Atsmai do
                     </h2>
                     <ul style={{ listStyleType: "initial" }}>
                        <h3 className="text-lg">Key features</h3>
                        <li>Add incomes and expenses</li>
                        <li>
                           A list of all of youre entries, sorted by month, with
                           the total of each month conveniently displayed on top
                        </li>
                        <li>
                           Click on entry and see the last 3 appearances of the
                           same entry
                        </li>
                        <li>
                           Add recurring expenses, Atsmai will add them for you
                           automatically when the time comes
                        </li>
                        <li>
                           Upcoming expenses displayed in the expenses list, no
                           surprises!
                        </li>
                        <li>Search and display entries</li>
                     </ul>
                  </li>
                  <li>
                     <h2 className="text-xl divider divider-start">
                        Sounds good?
                     </h2>
                     Join us or sign in!
                     <div className="mt-3 space-x-3">
                        <SignInBtn />
                        <RegisterBtn />
                     </div>
                  </li>
                  {/* <li>
                     <h2 className="text-xl divider divider-start">
                        What can Atsmai do
                     </h2>
                     With Atsmai you can register your income and expenses
                     wherever you are, wether on your computer or phone you can
                     always quickley access and retreive all of your data. After
                     you entered youre entry Atsmai will save youre entry title
                     and suggest it for you for the next time. Moreover, you can
                     click the entry and see the previous 3 entries of the same
                     title, this way you can easily compare them. You can also
                     create recurring expenses, and Atsmai will automatically
                     add them for you. Moreover, in the entries
                  </li> */}
               </ul>
            </div>
         </div>
      </section>
   );
};

export default About;
