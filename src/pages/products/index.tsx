import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "@product-modal";
import { products } from "@products";
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
} from "@mui/material";
import { saveDataFromCookie } from "@token-service";

export default function Index() {
  const [productData, setProductData] = useState<Array<any>>([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as const, // set default severity as 'success'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.productsGet({
          page: 1,
          limit: 10,
          name: "",
        });
        console.log(response);
        setProductData(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

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
    "Category",
    "Gender",
    "Actions",
  ];

  return (
    <div>
      <Product />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
        >
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
              {productData.map((product, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.age_min}</TableCell>
                  <TableCell>{product.age_max}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.cost}</TableCell>
                  <TableCell>{product.discount}</TableCell>
                  <TableCell>{product.category_id}</TableCell>
                  <TableCell>{product.for_gender}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
