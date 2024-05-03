import { fetchProjects } from "@/actions/project.actions";
import AddProject from "@/components/projects/addProject";
import ProjectCard from "@/components/projects/projectCard";

const ProjectsPage = async () => {
   const res = await fetchProjects();
   if (!res.ok) throw new Error("Error while fetching Data, Try again later.");
   const projects = res.data;
   console.log(projects);
   return (
      <section className="p-3 w-full max-w-screen">
         <div className="card card-compact bg-base-200 w-full">
            <div className="card-body">
               <div className="card-title">Projects</div>

               {/* body */}
               <div className="flex items-center gap-3">
                  {/* add new */}
                  <AddProject />
                  {/* projects */}
                  {projects.map((project) => (
                     <ProjectCard project={project} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default ProjectsPage;
