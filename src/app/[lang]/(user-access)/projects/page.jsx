import { fetchProjects } from "@/actions/project.actions";
import AddProject from "@/components/projects/addProject";
import ProjectCard from "@/components/projects/projectCard";
import { getDictionary } from "@/lib/dictionary";

const ProjectsPage = async ({ params: { lang } }) => {
   const res = await fetchProjects();
   const { projects: text } = await getDictionary(lang);
   if (!res.ok) throw new Error("Error while fetching Data, Try again later.");
   const projects = res.data;
   return (
      <section className="p-3 w-full max-w-screen">
         <div className="card card-compact bg-base-200 w-full">
            <div className="card-body">
               <div className="card-title">{text.title}</div>

               {/* body */}
               <div className="flex flex-wrap items-center gap-3">
                  {/* add new */}
                  <AddProject />
                  {/* projects */}
                  {projects.map((project) => (
                     <ProjectCard key={project._id} project={project} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default ProjectsPage;
