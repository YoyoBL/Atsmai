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

   function deleteAndReturnPath(key) {
      const params = new URLSearchParams(searchParams);
      params.delete(key);
      return `${path}/?${params.toString()}`;
   }

   return {
      searchParams,
      getFullPath,
      getPathWithNewParam,
      getQueryByName,
      deleteAndReturnPath,
   };
};

export default useQueryParams;
