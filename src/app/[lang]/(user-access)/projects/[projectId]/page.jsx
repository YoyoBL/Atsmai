import {
   getProjectById,
   syncProjectTotals,
   updateProject,
} from "@/actions/project.actions";
import BackBtn from "@/components/common/backBtn";
import ModalClient from "@/components/common/modalClient";
import ModalConfirm from "@/components/common/modalConfirm";
import ChangeStatusModal from "@/components/projects/changeStatusModal";
import ChangeStatusBtn from "@/components/projects/changeStatusBtn";
import DeleteProjectBtn from "@/components/projects/deleteProjectBtn";
import Entries from "@/components/projects/entries";
import ProjectTitle from "@/components/projects/title";
import { getDictionary } from "@/lib/dictionary";
import { openModalDOM } from "@/lib/modalTools";
import cn from "@/lib/tailwindMerge";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const ProjectPage = async ({ params: { lang, projectId } }) => {
   const res = await getProjectById(projectId);
   const { common, project: projectText } = await getDictionary(lang);
   const text = { ...common, ...projectText };
   if (!res.ok) throw new Error("Error while fetching data.");
   const project = res.data;
   const entries = project.entries;

   const totalIncomes = calculateTotal("income");
   const totalExpenses = calculateTotal("expense");
   const profit = totalIncomes - totalExpenses;

   if (
      project.totalIncomes !== totalIncomes ||
      project.totalExpenses !== totalExpenses
   ) {
      syncProjectTotals({
         projectId: project._id,
         totalIncomes,
         totalExpenses,
      });
   }

   function calculateTotal(entryType) {
      return project.entries
         .filter((entry) => entry.entryType === entryType)
         .reduce((total, entry) => total + entry.amount, 0);
   }
   const modalId = "change-status";
   const OppositeProjectStatus =
      project.status === "active" ? "inactive" : "active";
   const statusChangeMessage = `${text.statusChangeMessage} - ${text[OppositeProjectStatus]}?`;

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

               {/*more info */}
               <div className="rounded-xl">
                  <table className="table table-sm">
                     <tbody>
                        {/* row 1 */}
                        <tr>
                           <td>Start Date:</td>
                           <td>{format(project.startDate, "dd-MM-yyyy")}</td>
                        </tr>
                        <tr>
                           <td>Status:</td>
                           <td>
                              <ChangeStatusBtn
                                 modalId={modalId}
                                 className={
                                    project.status === "active"
                                       ? "btn-success"
                                       : "btn-error"
                                 }
                              >
                                 <Cog6ToothIcon className="size-5" />
                                 <div className={cn("capitalize")}>
                                    {project.status}
                                 </div>
                              </ChangeStatusBtn>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               {/* entries */}
               <Entries entries={entries} text={text} />
            </div>
         </div>

         <ChangeStatusModal
            modalId={modalId}
            message={statusChangeMessage}
            text={text}
         />
      </section>
   );
};

export default ProjectPage;
