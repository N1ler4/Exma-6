import { useState, useEffect } from "react";
import BasicModal from "@modals";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { category } from "../service/category/categories";
import { productValidationSchema } from "@validation";
import { products } from "@products";

export default function Product() {
  const [categories, setCategories] = useState<any[]>([]);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<AlertColor | undefined>(undefined); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await category.categoryGet({
          page: 1,
          limit: 10,
        });
        console.log("Categories:", res.data.categories);
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const initialValues: any = {
    age_max: null,
    age_min: null,
    category_id: categories.length > 0 ? categories[0].category_id : "",
    color: "",
    cost: null,
    count: null,
    description: "",
    discount: null,
    for_gender: "",
    made_in: "",
    product_name: "",
    size: null,
  };

  const handleSubmit = async (values: any) => {
    try {
      const res = await products.productsPost(values);
      console.log("Product posted successfully:", res.data);

      setNotificationSeverity("success");
      setNotificationMessage("Product added successfully");
      setOpenNotification(true);

      return res.data;
    } catch (err) {
      console.error("Error posting product:", err);

      setNotificationSeverity("error");
      setNotificationMessage("Error adding product. Please try again.");
      setOpenNotification(true);

      throw err;
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  return (
    <>
      <BasicModal
        modalContent={
          <Formik
            initialValues={initialValues}
            validationSchema={productValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-5"
              >
                <h1 className="font-bold text-[32px]">Add New User</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
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
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      as="select"
                      name="for_gender"
                      className="w-full mb-3 border py-3 rounded-md"
                    >
                      <option className="ml-3">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                    <ErrorMessage
                      name="for_gender"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      as="select"
                      name="category_id"
                      className="w-full mb-3 border py-3 rounded-md"
                    >
                      <option>Select Category</option>
                      {categories.map((item) => (
                        <option
                          key={item?.category_id}
                          value={item?.category_id}
                        >
                          {item?.category_name}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="category_id"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      as="select"
                      name="made_in"
                      className="w-full mb-3 border py-3 rounded-md"
                    >
                      <option>Made In</option>
                      <option value="UZB">UZB</option>
                      <option value="USA">USA</option>
                      <option value="RUS">RUS</option>
                    </Field>
                    <ErrorMessage
                      name="made_in"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      type="number"
                      name="size"
                      placeholder="Size"
                      className="p-2 border rounded"
                      as={TextField}
                      size="small"
                    />
                    <ErrorMessage
                      name="size"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      type="number"
                      name="age_max"
                      placeholder="Maximum age"
                      className="p-2 border rounded"
                      as={TextField}
                      size="small"
                    />
                    <ErrorMessage
                      name="age_max"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      type="number"
                      name="count"
                      placeholder="Count"
                      className="p-2 border rounded"
                      as={TextField}
                      size="small"
                    />
                    <ErrorMessage
                      name="count"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      type="number"
                      name="age_min"
                      placeholder="Minimum age"
                      className="p-2 border rounded"
                      as={TextField}
                      size="small"
                    />
                    <ErrorMessage
                      name="age_min"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
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
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
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
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      type="number"
                      name="cost"
                      placeholder="Cost"
                      className="p-2 border rounded"
                    />
                    <ErrorMessage
                      name="cost"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <Field
                      type="number"
                      name="discount"
                      placeholder="Discount"
                      className="p-2 border rounded"
                      as={TextField}
                      size="small"
                    />
                    <ErrorMessage
                      name="discount"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
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
      <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notificationSeverity}
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
