import { useState, useEffect } from "react";
import BasicModal from "@modals";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { category } from "../service/category/categories";
import { productValidationSchema } from "@validation";
import { PostData } from "@products";
import { products } from "@products";

export default function Product() {
  const [categories, setCategories] = useState<any[]>([]);

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

  const initialValues: PostData = {
    age_max: null,
    age_min: null,
    category_id: "",
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


  const handleSubmit = async(value:any) => {
    try {
      const res = await products.productsPost(value);
      console.log("Product posted successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error posting product:", err);
      throw err;
    }
  };

  return (
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
              <div className="grid grid-cols-2">
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
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
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
                </div>
                <div className="flex flex-col">
                  <Field
                    as={Select}
                    name="category_id"
                    placeholder="Category"
                    className="p-2 border rounded"
                    size="small"
                  >
                    <MenuItem value="">Select Category</MenuItem>
                    {categories.map((category: any) => (
                      <MenuItem
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="flex flex-col">
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
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
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
                    className="text-red-500"
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                >
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
