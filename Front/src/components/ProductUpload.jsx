import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const [content, setContent] = useState([]); // State to hold product data
  const [currentPage, setCurrentPage] = useState(0); // State to hold the current page
  const [itemsPerPage] = useState(8); // Number of items per page
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  // Fetch products from the API with pagination
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8081/api/products");
      const { data } = response;
      const { content } = data;
      setContent(content || []); // Update the state with the fetched data
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch the initial page of data
  }, []);

  const UpdateProduct = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };

  const deleteItem = async (productId) => {
    try {
      // Retrieve the bearer token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.delete(`http://localhost:8081/api/products/${productId}`, {
        headers: {
          "Authorization": `Bearer ${token}` // Include the bearer token in the Authorization header
        },
      });

      if (response.status === 204) {
        // If deletion is successful, filter out the deleted product from the state
        setContent(content.filter(product => product.id !== productId));
        alert("Item deleted successfully");
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const FaUpload = () => {
    navigate("/upload");
  };

  const Export = async () => {
    try {
      // Retrieve the bearer token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8081/api/products/export", {
        headers: {
          "Authorization": `Bearer ${token}` // Include the bearer token in the Authorization header
        },
        responseType: 'blob' // Important for handling binary data
      });

      // Create a URL for the file and initiate a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'products_export.csv'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Export successful!");

    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error exporting data");
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 0 && page < Math.ceil(content.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const paginatedItems = content.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <>
      <div className="upload">
        <button className="upload-btn" onClick={FaUpload}>Upload Products</button>
        <button className="export-btn" onClick={Export}>Export Products</button>
      </div>
      <table cellPadding={10} cellSpacing={10}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <span className="fa fa-edit" width={50} height={50} onClick={() => { UpdateProduct(product.id) }} style={{ cursor: "pointer" }}></span>
              </td>
              <td>
                <span
                  className="fa fa-trash"
                  onClick={() => deleteItem(product.id)}
                  style={{ cursor: 'pointer' }}
                ></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
        {Array.from({ length: Math.ceil(content.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index ? "active" : ""}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(content.length / itemsPerPage) - 1}>Next</button>
      </div>
      <style>
        {`
          table {
            width: 100%;
          }
            th{
            background-color: lightgray; /* A close "ash" color */

            }


          th, td {
            border: 1px solid black;
            font-family: 'Lato', sans-serif;
            padding: 8px;
            text-align: center;
            // border-radius:20px;
          }
          .upload {
            margin: 10px;
            display:flex;
            justify-content: end;
          }
          .upload-btn{
              background: #16a34a;
            color: white;
            margin: 10px;
          }
          .export-btn {
           background: #1a1a1a;
           color: white;
            margin: 10px;
          }
          .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 0;
          }
          .pagination button {
            background-color: #0056b3;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 4px;
          }
          .pagination button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          .pagination .active {
            background-color: #004494;
          }
        `}
      </style>
    </>
  );
};

export default ProductUpload;
