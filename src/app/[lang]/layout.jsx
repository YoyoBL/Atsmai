import { Inter } from "next/font/google";
import "./globals.css";
import { i18n } from "@/i18n.config";
import SideBar from "@/components/navs/sidebar";
import cn from "@/lib/tailwindMerge";
import { Providers } from "@/contexts/providers";
import { getTheme } from "@/actions/theme.actions";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Atsmai",
   description: "A business incomes and expenses manager",
};

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {
   const session = await auth();

   const theme = (await getTheme()) || "dark";

   return (
      <html
         dir={params.lang === "he" ? "rtl" : "ltr"}
         lang={params.lang}
         data-theme={theme}
      >
         <body className={cn(inter.className, "bg-base-100 min-h-screen ")}>
            <Providers session={session}>
               <SideBar lang={params.lang} sessionTheme={theme}>
                  <main className="h-full w-full flex justify-center overflow-hidden">
                     {children}
                  </main>
               </SideBar>
            </Providers>
         </body>
      </html>
   );
}
