import AddProject from "@/components/projects/addProject";
import ProjectCard from "@/components/projects/projectCard";

const Projects = () => {
   return (
      <section className="p-3 w-full max-w-screen">
         <div className="card card-compact bg-base-200 w-full">
            <div className="card-body">
               <div className="card-title">Projects</div>

               {/* body */}
               <div className="flex items-center gap-3">
                  {/* add new */}
                  <AddProject />
                  {/* card */}

                  <ProjectCard />
               </div>
            </div>
         </div>
      </section>
   );
};

export default Projects;
