import "client-only";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/navigation";

const useModal = () => {
   const router = useRouter();
   const { deleteAndReturnPath } = useQueryParams();
   return {
      closeQueryModal: () => {
         const redirect = deleteAndReturnPath("modal");
         router.replace(redirect);
      },
   };
};

export default useModal;
