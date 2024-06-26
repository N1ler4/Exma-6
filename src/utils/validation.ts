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
  email: Yup.string().required("Email is required"),
});

export const productValidationSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  for_gender: Yup.string().required("Gender is required"),
  made_in: Yup.string().required("Made in is required"),
  size: Yup.number().required("Size is required"),
  age_max: Yup.number().required("Maximum age is required"),
  age_min: Yup.number().required("Minimum age is required"),
  color: Yup.string().required("Color is required"),
  count: Yup.string().required("Count is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number().required("Cost is required"),
  discount: Yup.number().required("Discount is required"),
});

export const usersUpdateValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  gender: Yup.string().required('Gender is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string().required('Password is required'),
  phone_number: Yup.string().required('Phone number is required'),
  age: Yup.number().required('Age is required').positive('Age must be a positive number'),
  email: Yup.string().required('Email is required'),
});