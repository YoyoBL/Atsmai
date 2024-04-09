"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

const RegisterBtn = () => {
   const { lang } = useParams();
   const text = lang === "en" ? "Register" : "הרשמה";
   return (
      <Link href={`/${lang}/register`} className="btn btn-neutral">
         {text}
      </Link>
   );
};

export default RegisterBtn;
