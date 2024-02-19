import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts/providers";
import cn from "@/lib/tailwindMerge";
import SideBarComponent from "@/components/sidebar";
import Header from "@/components/header";
import { i18n } from "@/i18n.config";
import LocaleSwitcher from "@/components/localeSwitcher";
import ThemeSwitcher from "@/components/themeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Atsmai",
   description: "Generated by create next app",
};

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
   return (
      <html
         dir={params.lang === "he" ? "rtl" : "ltr"}
         lang={params.lang}
         data-theme="dark"
      >
         <body className={cn(inter.className, "bg-base-100 min-h-screen ")}>
            <div className="drawer lg:drawer-open">
               <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
               />
               <div className="drawer-content flex flex-col items-center justify-center">
                  {/* Page content here */}
                  <main className="p-5  ">{children}</main>

                  <label
                     htmlFor="my-drawer-2"
                     className="btn btn-primary drawer-button lg:hidden"
                  >
                     Open drawer
                  </label>
               </div>
               <div className="drawer-side">
                  <label
                     htmlFor="my-drawer-2"
                     aria-label="close sidebar"
                     className="drawer-overlay"
                  ></label>
                  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                     {/* Sidebar content here */}
                     {/* <Header lang={params.lang} /> */}
                     <div className="flex justify-between">
                        <LocaleSwitcher />
                        <ThemeSwitcher />
                     </div>

                     <li>
                        <a>Sidebar Item 1</a>
                     </li>
                     <li>
                        <a>Sidebar Item 2</a>
                     </li>
                  </ul>
               </div>
            </div>
         </body>
      </html>
   );
}
