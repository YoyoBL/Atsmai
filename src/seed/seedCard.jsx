"use client";

import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const SeedCard = () => {
   return (
      <div dir="ltr" className="card bg-base-200 h-fit w-full  md:w-3/4 ">
         <div className="card-body">
            <div className="card-title text-3xl justify-center">
               Developer Option
            </div>
            <Link className="btn btn-primary" href={`seed`}>
               <Cog6ToothIcon className="size-5" />
               Click here to seed initial data
            </Link>
         </div>
      </div>
   );
};

export default SeedCard;
