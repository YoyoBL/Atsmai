"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const RegisterBtn = () => {
   const { lang } = useParams();
   return (
      <Link href={`/${lang}/register`} className="btn btn-neutral">
         Register
      </Link>
   );
};

export default RegisterBtn;
