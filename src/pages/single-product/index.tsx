import { useEffect, useState } from "react";
import { products } from "@products";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateProduct from "../../modals/single-product";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetail = () => {
  const navigate = useNavigate();
  const productId = getDataFromCookie("id");
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState([]);
  console.log(images);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const response = await products.singleProducts(productId);
          console.log(response.data.image_url);
          setProduct(response.data);
          if (response?.data?.image_url) {
            const imgArray = response.data.image_url.map((url: string) => ({
              original: url,
              thumbnail: url,
            }));
            setImages(imgArray);
          }
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
      <div className="flex gap-5">
        <Button onClick={handleBackClick} variant="contained" color="primary">
          Back
        </Button>
        <Button onClick={deleteProduct} variant="contained" color="primary">
          Delete
        </Button>
        {product && (
          <UpdateProduct
            ageMax={product.age_max}
            ageMin={product.age_min}
            for_gender={product.for_gender}
            size={product.size}
            cost={product.cost}
            description={product.description}
            discount={product.discount}
            madeIn={product.made_in}
            count={product.count}
            color={product.color}
            productName={product.product_name}
          />
        )}
      </div>
      {product && (
        <div className="mt-[60px] flex items-center justify-around">
          <div className="w-[600px]">
            <ImageGallery items={images} />
          </div>
          <div>
            <h2
              style={{
                marginBottom: "10px",
                fontSize: "32px",
                color: "#444",
              }}
            >
              {product.product_name}
            </h2>
            <div className="flex gap-3">
              <p>
                <strong style={{ color: "#9388" }}>Available Age:</strong>{" "}
                <div className="flex items-center text-[24px]">
                  {" "}
                  <div className="text-purple-600">
                    {product.age_min}
                    <span>-</span>
                    {product.age_max}
                  </div>
                </div>
              </p>
            </div>
            <div className="flex gap-3">
              <p>
                <strong style={{ color: "#9388" }}>Size:</strong>
                <div className="text-purple-600">{product.size}</div>
              </p>
              <p>
                <strong style={{ color: "#9388" }}>Gender:</strong>{" "}
                <div className="text-purple-600">{product.for_gender}</div>
              </p>
            </div>
            <div className="flex gap-3">
              <p>
                <strong style={{ color: "#9388" }}>Color:</strong>{" "}
                <div className="text-purple-600">{product.color}</div>
              </p>
              <p>
                <strong style={{ color: "#9388" }}>Made In:</strong>{" "}
                <div className="text-purple-600">{product.made_in}</div>
              </p>
            </div>

            <p>
              <strong style={{ color: "#9388" }}>Description:</strong>{" "}
              <div className="text-purple-600 max-w-[400px]">
                {product.description}
              </div>
            </p>
            <p>
              <strong style={{ color: "#9388" }}>Count:</strong>
              <br />
              <div className="text-green-400 text-[24px]">{product.count}</div>
            </p>
            <p>
              <strong style={{ color: "#9388" }}>Price:</strong>
              <br />
              <div className="text-[24px] flex gap-5 items-center">
                {Math.floor(product.cost / product.discount) + "$"}{" "}
                <p className="text-[16px] line-through text-[#6b6b6b]">
                  {product.cost}$
                </p>
              </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
