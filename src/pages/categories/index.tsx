import { useEffect, useState } from "react";
import BasicModal from "@modals";
import { Button, TextField, Snackbar } from "@mui/material";
import { Alert, AlertColor } from "@mui/material"; // Import AlertColor
import { category } from "../../service/category/categories";
import { deleteCategory } from "../../components/category-actions/delete";
import { editCategory } from "../../components/category-actions/edit";
import Loader from "@ui-load";

interface Category {
  category_id: string;
  category_name: string;
}

export default function Index() {
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState<Category[]>([]);
  const [loader, setLoader] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as AlertColor, // Set default severity as 'success'
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async () => {
    try {
      const data = { category_name: categoryName };
      const res = await category.categoryPost(data);
      console.log(res);
      setNotification({
        open: true,
        message: "Category added successfully",
        severity: "success",
      });
      getCategories();
    } catch (error) {
      console.log(error);
      setNotification({
        open: true,
        message: "Failed to add category",
        severity: "error",
      });
    }
  };

  const getCategories = async () => {
    try {
      const res = await category.categoryGet({
        page: 1,
        limit: 10,
      });
      setData(res.data.categories);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleEdit = async (categoryId: string) => {
    try {
      await editCategory(categoryId, categoryName);
      setNotification({
        open: true,
        message: "Category edited successfully",
        severity: "success",
      });
      getCategories();
    } catch (error) {
      console.log(error);
      setNotification({
        open: true,
        message: "Failed to edit category",
        severity: "error",
      });
    }
  };

  return (
    <>
      <BasicModal
        modalContent={
          <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-[32px]">Add New Category</h1>
            <div className="flex">
              <TextField
                size="small"
                name="category"
                placeholder="Enter new category"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Button variant="contained" onClick={handleSubmit}>
                Add
              </Button>
            </div>
          </div>
        }
        handleOpen={false}
        buttonText="Add New Category"
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {loader ? (
        <Loader />
      ) : data ? (
        <div>
          <h1 className="p-2 text-[34px]">Categories:</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((category) => (
                <tr key={category.category_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.category_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex">
                    <BasicModal
                      modalContent={
                        <div className="flex flex-col justify-center items-center gap-5">
                          <h1 className="font-bold text-[32px]">Update Name</h1>
                          <div className="flex">
                            <TextField
                              size="small"
                              name="category"
                              placeholder="Enter new category"
                              value={categoryName}
                              onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <Button
                              variant="contained"
                              onClick={() => handleEdit(category.category_id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      }
                      handleOpen={false}
                      buttonText="Edit"
                    />
                    <Button
                      variant="contained"
                      onClick={() => deleteCategory(category.category_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-[24px] text-center text-red-400">
          No categories found. Please add some.
        </h1>
      )}
    </>
  );
}
