const ProjectPage = ({ params: { projectId } }) => {
   return (
      <section className="p-3 w-full max-w-screen">
         <div className="card card-compact bg-base-200 w-full">
            <div className="card-body">
               <div className="card-title">Projects</div>

               {/* body */}
               <div className="stats shadow">
                  <div className="stat place-items-center p-3 ">
                     <div className="stat-value text-xl  text-primary">
                        15000
                     </div>
                     <div className="stat-desc text-primary">Incomes</div>
                  </div>

                  <div className="stat place-items-center p-3">
                     <div className="stat-value text-xl text-secondary">
                        4,200
                     </div>
                     <div className="stat-desc text-secondary">Expenses</div>
                  </div>

                  <div className="stat place-items-center p-3">
                     <div className="stat-value text-xl">15000</div>
                     <div className="stat-desc">Profit</div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ProjectPage;
