import { useState, useEffect } from "react";
import BasicModal from "@modals";
import { Button, Snackbar, TextField } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { category } from "../service/category/categories";
import { productValidationSchema } from "@validation";
import { products } from "@products";
import { getDataFromCookie } from "@token-service";
import MuiAlert from "@mui/material/Alert";

export default function UpdateProduct({
  ageMax,
  ageMin,
  for_gender,
  size,
  cost,
  description,
  discount,
  madeIn,
  count,
  color,
  productName,
}: any) {
  const [categories, setCategories] = useState<any[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    product_id: getDataFromCookie("id"),
  };

  const handleSubmit = async (values: any) => {
    try {
      const res = await products.productsUpdate(values);
      console.log("Product posted successfully:", res.data);
      if (res.status === 200) {
        handleOpenSnackbar("Product updated successfully!");
      }
      return res.data;
    } catch (err) {
      console.error("Error posting product:", err);
      throw err;
    }
  };
  const handleOpenSnackbar = (message:any) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
                <h1 className="font-bold text-[32px]">Update Product</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Field
                      name="product_name"
                      placeholder="Name"
                      className="p-2 border rounded"
                      as={TextField}
                      size="small"
                      defaultValue={productName}
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
                      defaultValue={for_gender}
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
                      defaultValue={category}
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
                      defaultValue={madeIn}
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
                      defaultValue={size}
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
                      defaultValue={ageMax}
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
                      defaultValue={count}
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
                      defaultValue={ageMin}
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
                      defaultValue={color}
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
                      defaultValue={description}
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
                      defaultValue={cost}
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
                      defaultValue={discount}
                    />
                    <ErrorMessage
                      name="discount"
                      component="div"
                      className="text-[#ff3636]"
                    />
                  </div>
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        }
        handleOpen={false}
        buttonText="Update"
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
