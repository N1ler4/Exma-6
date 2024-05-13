import { useEffect, useState } from "react";
import { products } from "@products";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const productId = getDataFromCookie("id");
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const response = await products.singleProducts(productId);
          console.log(response);
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBackClick = () => {
    deleteDataFromCookie("id");
    navigate("/main/products");
  };

  const deleteProduct = async () => {
    try {
      await products.productsDelete(productId);
      deleteDataFromCookie("id");
      navigate("/main/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleBackClick} variant="contained" color="primary">
        Back
      </Button>
      <Button onClick={deleteProduct} variant="contained" color="primary">
        Delete
      </Button>
      {product && (
        <div style={{ marginTop: "20px" }}>
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "24px",
              color: "#333",
              textDecoration: "underline",
            }}
          >
            {product.product_name}
          </h2>
          <div className="flex gap-3">
            <p>
              <strong style={{ color: "#777" }}>Age Min:</strong>{" "}
              {product.age_min}
            </p>
            <p>
              <strong style={{ color: "#777" }}>Age Max:</strong>{" "}
              {product.age_max}
            </p>
          </div>
          <div className="flex gap-3">
            <p>
              <strong style={{ color: "#777" }}>Size:</strong> {product.size}
            </p>
            <p>
              <strong style={{ color: "#777" }}>Gender:</strong>{" "}
              {product.for_gender}
            </p>
          </div>
          <p>
            <strong style={{ color: "#777" }}>Price:</strong> {product.cost}
          </p>
          <p>
            <strong style={{ color: "#777" }}>Discount:</strong>{" "}
            {product.discount}
          </p>
          <div className="flex gap-3">
            <p>
              <strong style={{ color: "#777" }}>Color:</strong> {product.color}
            </p>
            <p>
              <strong style={{ color: "#777" }}>Made In:</strong>{" "}
              {product.made_in}
            </p>
          </div>
          <p>
            <strong style={{ color: "#777" }}>Count:</strong> {product.count}
          </p>
          <p>
            <strong style={{ color: "#777" }}>Description:</strong>{" "}
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
