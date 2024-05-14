import BasicModal from "@modals";
import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { usersUpdateValidationSchema } from "@validation";
// import { User } from "../pages/users";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { users } from "@users";

export function UserUpdate({ first_name, last_name, gender, password }: any) {
  console.log(first_name);

  //   interface UpdateUser extends User {
  //     phone_number: string;
  //     age: number;
  //   }

  const initialValues: any = {
    first_name: "",
    gender: "",
    last_name: "",
    password: "",
    email: "",
    id: getDataFromCookie("userId"),
    phone_number: "",
    age: null,
  };

  const handleSubmit = async (values: any) => {
    try {
      const res = await users.usersUpdate(values);
      console.log("Product edited successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error edite product:", err);
      throw err;
    }
  };

  return (
    <BasicModal
      modalContent={
        <Formik
          initialValues={initialValues}
          validationSchema={usersUpdateValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onClick={() => {
                console.log("first");
              }}
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-5"
            >
              <h1 className="font-bold text-[32px]">Update User</h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Field
                    name="first_name"
                    placeholder="Name"
                    className="p-2 border rounded"
                    as={TextField}
                    size="small"
                    defaultValue={first_name}
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    as="select"
                    name="gender"
                    className="w-full mb-3 border py-3 rounded-md"
                    defaultValue={gender}
                  >
                    <option className="ml-3">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Surname"
                    className="p-2 border rounded"
                    as={TextField}
                    size="small"
                    defaultValue={last_name}
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="p-2 border rounded"
                    as={TextField}
                    size="small"
                  />
                  <ErrorMessage
                    name="Email"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    type="text"
                    name="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                    as={TextField}
                    size="small"
                    defaultValue={password}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    className="p-2 border rounded"
                    as={TextField}
                    size="small"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <div className="flex flex-col">
                  <Field
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="p-2 border rounded"
                    as={TextField}
                    size="small"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-[#ff3636]"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    deleteDataFromCookie("userId");
                  }}
                >
                  Add
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      }
      handleOpen={false}
      buttonText="Update"
    />
  );
}
