import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Product from "@product-modal";

export default function Index() {
  return (
    <div>
      <Product
        onSubmit={() => {
          console.log("hello");
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Made In</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Maximum Age</TableCell>
              <TableCell>Minimum Age</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.for_gender}</TableCell>
                <TableCell>{product.made_in}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.age_max}</TableCell>
                <TableCell>{product.age_min}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.cost}</TableCell>
                <TableCell>{product.discount}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
