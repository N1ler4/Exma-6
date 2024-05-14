import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "@product-modal";
import { products } from "@products";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  InputBase,
  IconButton,
} from "@mui/material";
import { getDataFromCookie, saveDataFromCookie } from "@token-service";
import axios from "axios";

export default function Index() {
  const [productData, setProductData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [change, setChange] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, change]);

  const fetchData = async (page: any) => {
    try {
      const response = await products.productsGet({
        page: page,
        limit: 10,
        name: change,
      });
      console.log(response);
      setProductData(response.data.products);
      setTotalPages(Math.ceil(response.data.total_count / 10));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const columns = [
    "Product Name",
    "Age Min",
    "Age Max",
    "Size",
    "Price",
    "Discount",
    "Gender",
    "Actions",
  ];

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const postMedia = async (data: any) => {
    try {
      const token = getDataFromCookie("token");
      const url = `http://store.go-clothes.uz:5555/v1/media/upload-photo?id=${data.id}`;
      const formData = new FormData();
      formData.append("file", data.upload_photo);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        setNotification({
          open: true,
          message: "Image uploaded successfully!",
          severity: "success",
        });
      }
    } catch (error: any) {
      console.log(error);
      setNotification({
        open: true,
        message: "Error uploading image. Please try again.",
        severity: "error",
      });
    }
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const data = {
      upload_photo: file,
      id: getDataFromCookie("productId"),
    };
    postMedia(data);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Product />
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              width: 400,
              alignItems: "center",
              display: "flex",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "serch google maps" }}
              onChange={(e) => setChange(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert onClose={handleNotificationClose} severity={"success"}>
          {notification.message}
        </Alert>
      </Snackbar>

      <div className="mt-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productData ? (
                productData.map((product, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.age_min}</TableCell>
                    <TableCell>{product.age_max}</TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell>{product.cost}</TableCell>
                    <TableCell>{product.discount}</TableCell>
                    <TableCell>{product.for_gender}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          component={Link}
                          to={`${product.product_id}`}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            saveDataFromCookie("id", `${product.product_id}`);
                          }}
                        >
                          View
                        </Button>
                        <input
                          className="border p-0.5 rounded-md"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          onClick={() => {
                            saveDataFromCookie(
                              "productId",
                              `${product.product_id}`
                            );
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages > 1 && (
          <div className="pagination">
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
