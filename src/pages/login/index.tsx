import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function index() {
  const initialValues = {
    email:"",
    password:""
  }
  const schema = Yup.object().shape({
    email: Yup.string().min(4, "Too Short!").required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });
  const handleSubmit = () => {
    console.log("123")
  }
  return (
    <>
      <h1>Login</h1>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => 
        (<Form>
          <Field type="email" name="email" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>)}
      </Formik>
    </>
  );
}

export default index;
