import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Snackbar } from "@mui/material";
import { Alert } from '@mui/material';
import useAuthStore from "../../store/auth";
import { loginSchema } from "@validation";
import { loginInterface } from "@interface";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { saveDataFromCookie } from "@token-service";

function Index() {
  const navigate = useNavigate();
  const { signin } = useAuthStore();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const initialValues: loginInterface = {
    email: "",
    password: "",
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async (values: loginInterface) => {
    try {
      await loginSchema.validate(values, { abortEarly: false });
      const res = await signin(values);
      console.log("Response:", res);
      if (res && res.status === 200) {
        saveDataFromCookie("email" , values.email);
        setNotification({ open: true, message: 'Login Successful', severity: 'success' });
        navigate("/main");
      }
    } catch (err) {
      console.log("Error:", err);
      setNotification({ open: true, message: 'Login Failed', severity: 'error' });
    }
  };

  return (
    <div className="w-full h-[100vh] flex gap-10 flex-col justify-center items-center bg-img">
      <h1 className="text-[46px] font-bold">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <Field
              type="email"
              name="email"
              className="border-white"
              as={TextField}
              id="standard-textarea"
              label="Email"
              placeholder="Email"
              size="small"
              style={{ width: "400px"}} 
            />
            <ErrorMessage name="email" component="div" className="error" />

            <Field
              type="password"
              name="password"
              className=""
              as={TextField}
              label="Password"
              placeholder="Password"
              multiline
              size="small"
              style={{ width: "400px"}} 
            />
            <ErrorMessage name="password" component="div" className="error" />

            <Button variant="outlined" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity as "success" | "error"}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Index;
