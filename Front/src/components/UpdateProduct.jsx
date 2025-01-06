import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Create refs for the form elements
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const subcategoryIdRef = useRef(null);
  const subcategoryNameRef = useRef(null);
  const brandRef = useRef(null);
  const ratingRef = useRef(null);
  const quantityRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Fetch the product details using productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/products/${productId}`);
        const product = response.data;
        // Set the form values using refs
        nameRef.current.value = product.name;
        priceRef.current.value = product.price;
        descriptionRef.current.value = product.description;
        subcategoryIdRef.current.value = product.subcategoryId;
        subcategoryNameRef.current.value = product.subcategoryName;
        brandRef.current.value = product.brand;
        ratingRef.current.value = product.rating;
        quantityRef.current.value = product.quantity;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Manually handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Gather data from refs
    const product = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      subcategoryId: subcategoryIdRef.current.value,
      subcategoryName: subcategoryNameRef.current.value,
      brand: brandRef.current.value,
      rating: ratingRef.current.value,
      quantity: quantityRef.current.value,
    };
  
    const image = imageRef.current.files[0]; // Get the selected image file
  
    // Create FormData to send both the product data and the image file
    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    if (image) {
      formData.append("image", image);
    }
  
    try {
      // Retrieve the bearer token from local storage
      const token = localStorage.getItem("token");
  
      const response = await axios.put(`http://localhost:8081/api/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // Include the bearer token in the Authorization header
        },
      });
  console.log(token);
      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/AdminDashboard");
      } else {
        alert("Failed to update product!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product!");
    }
  };
  
  // Internal CSS styles
  const styles = {
    container: {
      width: "50%",
      margin: "auto", // Reduced margin
      padding: "0.5rem",   // Reduced padding
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    },
    title: {
      textAlign: "center",
      color: "#333"
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "1rem",
      color: "#555"
    },
    input: {
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      outline: "none",
      width: "100%"
    },
    textarea: {
      padding: "0.2rem",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      outline: "none",
      width: "100%",
      resize: "vertical",
      minHeight: "20px" 
    },
    button: {
      backgroundColor: "#0056b3",
      color: "white",
      padding: "0.6rem 1.8rem", // Reduced padding
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Update Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        {/* Product Data Inputs using refs */}
        <label htmlFor="name" style={styles.label}>Product Name:</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          placeholder="Enter product name"
          style={styles.input}
        />
        <br />
        <label htmlFor="price" style={styles.label}>Price:</label>
        <input
          type="number"
          id="price"
          ref={priceRef}
          placeholder="Enter product price"
          style={styles.input}
        />
        <br />
        <label htmlFor="description" style={styles.label}>Description:</label>
        <textarea
          id="description"
          ref={descriptionRef}
          placeholder="Enter product description"
          style={styles.textarea}
        ></textarea>
        <br />
        <label htmlFor="subcategoryId" style={styles.label}>Subcategory ID:</label>
        <input
          type="number"
          id="subcategoryId"
          ref={subcategoryIdRef}
          placeholder="Enter subcategory ID"
          style={styles.input}
        />
        <br />
        <label htmlFor="subcategoryName" style={styles.label}>Subcategory Name:</label>
        <input
          type="text"
          id="subcategoryName"
          ref={subcategoryNameRef}
          placeholder="Enter subcategory name"
          style={styles.input}
        />
        <br />
        <label htmlFor="brand" style={styles.label}>Brand:</label>
        <input
          type="text"
          id="brand"
          ref={brandRef}
          placeholder="Enter product brand"
          style={styles.input}
        />
        <br />
        <label htmlFor="rating" style={styles.label}>Rating:</label>
        <input
          type="number"
          id="rating"
          ref={ratingRef}
          step="0.1"
          placeholder="Enter product rating"
          style={styles.input}
        />
        <br />
        <label htmlFor="quantity" style={styles.label}>Quantity:</label>
        <input
          type="number"
          id="quantity"
          ref={quantityRef}
          placeholder="Enter quantity in stock"
          style={styles.input}
        />
        <br />

        {/* Image Upload */}
        <label htmlFor="image" style={styles.label}>Product Image:</label>
        <input
          type="file"
          id="image"
          ref={imageRef}
          style={styles.input}
        />
        <br />

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = "#004494"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#0056b3"}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
