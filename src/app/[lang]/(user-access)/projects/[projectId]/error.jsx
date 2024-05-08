"use client";

import ErrorMessage from "@/components/common/errorMessage";

export default function Error({ error, reset }) {
   return <ErrorMessage error={error} reset={reset} />;
}
