"use client";
import {
   ChevronDownIcon,
   ChevronUpIcon,
   CircleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";

const CardWrapper = ({ children }) => {
   const { lang, projectId } = useParams();
   const href = `/${lang}/projects/${projectId}`;
   return (
      <Link href={href} className="card bg-base-100">
         {children}
      </Link>
   );
};

const ProjectCard = () => {
   return (
      <CardWrapper>
         <div className="card-body" style={{ padding: "0.75rem" }}>
            <div className="card-title text-base">Eli Kopter </div>
            <div>
               <ul className="text-sm bg-base-200 p-2 rounded-md">
                  <li className="text-primary flex gap-2">
                     <ChevronUpIcon className="size-5" />
                     100
                  </li>
                  <li className="text-secondary flex gap-2">
                     <ChevronDownIcon className="size-5" />
                     100
                  </li>
                  <li className="text-white flex gap-2">
                     <CircleStackIcon className="size-5" />
                     100
                  </li>
               </ul>
            </div>
         </div>
      </CardWrapper>
   );
};

export default ProjectCard;
