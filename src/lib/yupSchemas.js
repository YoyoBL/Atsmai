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
         amount: yup.number().min(1).required().typeError("Numbers only"),
         entryType: yup.mixed().oneOf(["income", "expense"]).required(),
         date: yup.date().required(),
         category: yup.string(),
      })
      .required();
}

export function YupNewRecurringSchema() {
   return yup
      .object({
         title: yup.string().min(2).required("Required field."),
         amount: yup
            .number()
            .min(1)
            .required("Required field.")
            .typeError("Numbers only"),
         startDate: yup.date().required("Required field."),
         category: yup.string("Required field."),
      })
      .required();
}

export function YupRegisterSchema() {
   return yup
      .object({
         firstName: yup.string().min(2).required("Required field."),
         lastName: yup.string().min(2).required("Required field."),
         email: yup.string().email().min(2).required("Required field."),
         password: yup
            .string()
            .matches(
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            )
            .required("Required field."),
         country: yup.string().min(2).required("Required field."),
         city: yup.string().min(2).required("Required field."),
      })
      .required();
}
