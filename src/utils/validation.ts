import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

export const usersvalidationSchema = Yup.object().shape({
  first_name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  last_name: Yup.string().required("Last Name is required"),
  password: Yup.string().required("Password is required"),
});
