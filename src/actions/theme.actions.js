"use server";

import { COOKIE_THEME_KEY } from "@/constants";
import { cookies } from "next/headers";

export async function switchThemeOnCookie(theme) {
   const cookiesStore = cookies();
   cookiesStore.set(COOKIE_THEME_KEY, theme);
   return { status: "ok" };
}

export async function getTheme() {
   const cookiesStore = cookies();
   const theme = cookiesStore.get(COOKIE_THEME_KEY);
   return theme?.value;
}
