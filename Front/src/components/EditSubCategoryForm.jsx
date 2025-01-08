/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSubCategoryForm.css";

const EditSubCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the subcategory ID from the route
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "" });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get/categories");
      if (response.data && Array.isArray(response.data.category)) {
        setCategories(response.data.category);
      } else {
        console.error("Invalid categories data:", response.data);
        alert("Failed to load categories. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Error fetching categories. Please try again later.");
    }
  };

  // Fetch existing subcategory details
  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/subcategory/${id}`);
      const subcategory = response.data;

      if (subcategory) {
        setName(subcategory.name || "");
        setDescription(subcategory.description || "");
        setCategory(subcategory.category || { id: "" }); // Set category as an object
      } else {
        alert("Subcategory not found.");
        navigate("/adminsubcategory");
      }
    } catch (error) {
      console.error("Error fetching subcategory details:", error);
      alert("Failed to load subcategory details. Please try again later.");
    }
  };

  // Load categories and subcategory details when component mounts
  useEffect(() => {
    fetchCategories();
    fetchSubCategory();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check category value before submission
    if (!category.id || category.id === "") {
      alert("Please select a category.");
      return;
    }

    console.log("Submitting updated subcategory with category ID:", category.id);

    const updatedSubcategory = {
      name: name.trim(),
      description: description.trim(),
      category: { id: category.id }, // Use category object as expected by the backend
    };

    try {
      await axios.put(`http://localhost:8081/api/subcategory/${id}`, updatedSubcategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Subcategory updated successfully!");
      navigate("/adminsubcategory");
    } catch (error) {
      console.error("Error updating subcategory:", error.response?.data || error.message);
      alert(`Failed to update subcategory: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category.id}
            onChange={(e) => setCategory({ id: e.target.value })}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Subcategory Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subcategory name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Subcategory Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter subcategory description"
            required
          ></textarea>
        </div>

        <button type="submit">Update Subcategory</button>
      </form>
    </div>
  );
};

export default EditSubCategoryForm;*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSubCategoryForm.css";

const EditSubCategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the subcategory ID from the route
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "" });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get/categories");
      if (response.data && Array.isArray(response.data.category)) {
        setCategories(response.data.category);
      } else {
        console.error("Invalid categories data:", response.data);
        alert("Failed to load categories. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Error fetching categories. Please try again later.");
    }
  };

  // Fetch existing subcategory details
  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/subcategory/${id}`);
      const subcategory = response.data;

      if (subcategory) {
        setName(subcategory.name || "");
        setDescription(subcategory.description || "");
        setCategory(subcategory.category || { id: "" }); // Set category as an object
      } else {
        alert("Subcategory not found.");
        navigate("/adminsubcategory");
      }
    } catch (error) {
      console.error("Error fetching subcategory details:", error);
      alert("Failed to load subcategory details. Please try again later.");
    }
  };

  // Load categories and subcategory details when component mounts
  useEffect(() => {
    fetchCategories();
    fetchSubCategory();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check category value before submission
    if (!category.id || category.id === "") {
      alert("Please select a category.");
      return;
    }

    console.log("Submitting updated subcategory with category ID:", category.id);

    const updatedSubcategory = {
      name: name.trim(),
      description: description.trim(),
      category: { id: category.id }, // Use category object as expected by the backend
    };

    try {
      await axios.put(`http://localhost:8081/api/subcategory/${id}`, updatedSubcategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Subcategory updated successfully!");
      navigate("/adminsubcategory");
    } catch (error) {
      console.error("Error updating subcategory:", error.response?.data || error.message);
      alert(`Failed to update subcategory: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Subcategory</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category.id}
            onChange={(e) => setCategory({ id: e.target.value })}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Subcategory Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subcategory name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Subcategory Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter subcategory description"
            required
          ></textarea>
        </div>

        <button type="submit">Update Subcategory</button>
      </form>
    </div>
  );
};

export default EditSubCategoryForm;
