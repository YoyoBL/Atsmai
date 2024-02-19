import * as yup from "yup";

export function YupUserSchema() {
   return yup
      .object({
         firstName: yup.string().min(2).required(),
         lastName: yup.string().min(2).required(),
         fullName: yup.string().min(2).required(),
         email: yup.string().email().required(),
         password: yup.string().min(5).required(),
         role: yup.string(),
         address: yup.string(),
         phoneNumber: yup
            .string()
            .matches(/^0\d{8,9}$/, "Invalid phone number")
            .required(),
         gender: yup.string(),
         positionAntilNow: yup.string(),
         fecerPosition: yup.string(),
         yearExperience: yup.string(),
         linkdinURL: yup.string().url(),
      })
      .required();
}

export function YupNewEntrySchema() {
   return yup
      .object({
         amount: yup.number().required(),
         entryType: yup.mixed().oneOf(["income", "expense"]).required(),
         date: yup.date().required(),
         category: yup.string(),
      })
      .required();
}
