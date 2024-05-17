"use client";
import cn from "@/lib/tailwindMerge";
import {
   ChevronDownIcon,
   ChevronUpIcon,
   CircleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";

const CardWrapper = ({ children, projectId }) => {
   const { lang } = useParams();
   const href = `/${lang}/projects/${projectId}`;
   return (
      <Link href={href} className="card bg-base-100  min-w-28">
         {children}
      </Link>
   );
};

const ProjectCard = ({ project }) => {
   const totalIncomes = project.totalIncomes;
   const totalExpenses = project.totalExpenses;
   const profit = totalIncomes - totalExpenses;

   const isStatusActive = project.status === "active";

   return (
      <CardWrapper projectId={project._id}>
         <div className="card-body " style={{ padding: "0.75rem" }}>
            <div className="card-title text-base">
               {project.title}{" "}
               <span
                  className={cn(
                     "text-xl",
                     isStatusActive ? "text-success" : "text-error"
                  )}
               >
                  •
               </span>
            </div>
            <div>
               <ul className="text-sm bg-base-200 p-2 rounded-md">
                  <li className="text-primary flex gap-2">
                     <ChevronUpIcon className="size-5" />
                     {totalIncomes}
                  </li>
                  <li className="text-secondary flex gap-2">
                     <ChevronDownIcon className="size-5" />
                     {totalExpenses}
                  </li>
                  <li className="text-white flex gap-2">
                     <CircleStackIcon className="size-5" />
                     {profit}
                  </li>
               </ul>
            </div>
         </div>
      </CardWrapper>
   );
};

export default ProjectCard;
