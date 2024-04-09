"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const RegisterBtn = ({ text }) => {
   if (!text) return null;
   const { lang } = useParams();
   return (
      <Link href={`/${lang}/register`} className="btn btn-neutral">
         {text.register}
      </Link>
   );
};

export default RegisterBtn;
