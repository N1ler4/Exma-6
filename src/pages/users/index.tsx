import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import BasicModal from "@modals";
import { usersvalidationSchema } from "@validation";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { users } from "@users";
import { saveDataFromCookie } from "@token-service";
import { deleteUser } from "../../components/users-actions";
import { UserUpdate } from "../../modals/users-update";

export interface User {
  first_name: string;
  gender: string;
  last_name: string;
  password: string;
  email: any;
  id: string;
}

const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as const,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(totalPages);
  const perPage = 10;

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  const initialValues: User = {
    first_name: "",
    gender: "",
    last_name: "",
    password: "",
    email: "",
    id: "",
  };

  const onSubmit = async (values: User, actions: any) => {
    try {
      await addUser(values);
      actions.resetForm();
      setNotification({
        open: true,
        message: "User added successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const addUser = async (newUser: User) => {
    try {
      await users.usersPost(newUser);
      getAllUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await users.usersGet({
        page: currentPage,
        limit: perPage,
      });
      setUserList(response.data.user);
      setTotalPages(Math.ceil(response.data.total_count / perPage));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      getAllUsers();
      setNotification({
        open: true,
        message: "User deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
      <BasicModal
        modalContent={
          <Formik
            initialValues={initialValues}
            validationSchema={usersvalidationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-5"
              >
                <h1 className="font-bold text-[32px]">Add New User</h1>
                <div className="flex flex-col gap-2">
                  <Field
                    name="first_name"
                    placeholder="Name"
                    className="p-2 border rounded"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-[#ff3636]"
                  />
                  <Field
                    name="email"
                    placeholder="Email"
                    className="p-2 border rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[#ff3636]"
                  />
                  <Field
                    as="select"
                    name="gender"
                    className="w-full mb-3 border py-3 rounded-md"
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
                  <Field
                    name="last_name"
                    placeholder="Last Name"
                    className="p-2 border rounded"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-[#ff3636]"
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 border rounded"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-[#ff3636]"
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
        buttonText="Add New User"
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : userList && userList.length > 0 ? (
              userList.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                      <div
                        onClick={() => {
                          saveDataFromCookie("userId", user.id);
                        }}
                      >
                        <UserUpdate
                          first_name={user.first_name}
                          gender={user.gender}
                          last_name={user.last_name}
                          password={user.password}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {userList.length >= perPage && (
        <div className="pagination">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </Button>
          {totalPages > 1 &&
            totalPages <= 10 &&
            Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
              >
                {index + 1}
              </Button>
            ))}
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default Index;
