import { getProjectById } from "@/actions/project.actions";
import BackBtn from "@/components/common/backBtn";
import DeleteProjectBtn from "@/components/projects/deleteProjectBtn";
import Entries from "@/components/projects/entries";
import ProjectTitle from "@/components/projects/title";
import { getDictionary } from "@/lib/dictionary";

const ProjectPage = async ({ params: { lang, projectId } }) => {
   const res = await getProjectById(projectId);
   const { common: text } = await getDictionary(lang);
   if (!res.ok) throw new Error("Error while fetching data.");
   const project = res.data;
   const entries = project.entries;

   const totalIncomes = calculateTotal("income");
   const totalExpenses = calculateTotal("expense");
   const profit = totalIncomes - totalExpenses;

   function calculateTotal(entryType) {
      return project.entries
         .filter((entry) => entry.entryType === entryType)
         .reduce((total, entry) => total + entry.amount, 0);
   }

   return (
      <section className="p-3 w-full max-w-xl">
         <div className="card card-compact bg-base-200 w-full">
            <div className="flex justify-between">
               <BackBtn className="m-2" />
               <DeleteProjectBtn id={project._id} />
            </div>
            <div className="card-body">
               <ProjectTitle title={project.title} id={project._id} />

               {/* body */}

               {/* totals */}
               <div className="stats shadow">
                  <div className="stat place-items-center p-3 ">
                     <div className="stat-value text-xl  text-primary">
                        {totalIncomes}
                     </div>
                     <div className="stat-desc text-primary">
                        {text.incomes}
                     </div>
                  </div>

                  <div className="stat place-items-center p-3">
                     <div className="stat-value text-xl text-secondary">
                        {totalExpenses}
                     </div>
                     <div className="stat-desc text-secondary">
                        {text.expenses}
                     </div>
                  </div>

                  <div className="stat place-items-center p-3">
                     <div className="stat-value text-xl">{profit}</div>
                     <div className="stat-desc">{text.profit}</div>
                  </div>
               </div>

               {/* entries */}
               <Entries entries={entries} text={text} />
            </div>
         </div>
      </section>
   );
};

export default ProjectPage;
