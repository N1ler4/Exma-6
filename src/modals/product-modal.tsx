import BasicModal from "@modals";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { PostData } from "@products";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { productValidationSchema } from "@validation";

export default function Product({ onSubmit }: any) {
  const initialValues: PostData = {
    age_max: null,
    age_min: null,
    products_id: "", 
    color: "", 
    cost: null,
    count: 0, 
    description: "", 
    discount: null,
    for_gender: "", 
    made_in: "", 
    product_name: "", 
    size: null,
  };

  return (
    <BasicModal
      modalContent={
        <Formik
          initialValues={initialValues}
          validationSchema={productValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-5"
            >
              <h1 className="font-bold text-[32px]">Add New User</h1>
              <div className="flex flex-col">
                <h1>Name</h1>
                <Field
                  name="product_name"
                  placeholder="Name"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="product_name"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  as={Select}
                  name="for_gender"
                  placeholder="Gender"
                  className="p-2 border rounded"
                  size="small"
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  as={Select}
                  name="made_in"
                  placeholder="Made In"
                  className="p-2 border rounded"
                  size="small"
                >
                  <MenuItem value="">Select Country</MenuItem>
                  <MenuItem value="UZB">UZB</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="RUS">RUS</MenuItem>
                </Field>

                <ErrorMessage
                  name="made_in"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="size"
                  placeholder="Size"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="size"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="age_max"
                  placeholder="Maximum age"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="age_max"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="age_min"
                  placeholder="Minimum age"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="age_min"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="color"
                  placeholder="Color"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="color"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="cost"
                  placeholder="Cost"
                  className="p-2 border rounded"
                />
                <ErrorMessage
                  name="cost"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  type="text"
                  name="discount"
                  placeholder="Discount"
                  className="p-2 border rounded"
                  as={TextField}
                  size="small"
                />
                <ErrorMessage
                  name="discount"
                  component="div"
                  className="text-red-500"
                />
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      }
       handleOpen={false}
      buttonText="Add New Product"
    />
  );
}
