import "client-only";

import { usePathname, useSearchParams } from "next/navigation";

const useQueryParams = () => {
   const path = usePathname();
   const searchParams = useSearchParams();

   function getFullPath() {
      return `${path}/?${searchParams.toString()}`;
   }

   function getPathWithNewParam(key, value) {
      const params = new URLSearchParams(searchParams);
      params.set(key, value);

      return `${path}?${params.toString()}`;
   }

   function getQueryByName(key) {
      return searchParams.get(key);
   }

   return {
      searchParams,
      getFullPath,
      getPathWithNewParam,
      getQueryByName,
   };
};

export default useQueryParams;
