"use server";

export async function customFetch(url, options) {
   const res = await fetch(process.env.NEXTAUTH_URL + url, options);
   const { data } = await res.json();
   if (!res.ok) throw new Error(data);
   return data;
}
