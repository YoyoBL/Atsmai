import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params: { lang } }) {
   const { page } = await getDictionary(lang);
   return <section>Home</section>;
}
