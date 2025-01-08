import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddSubCategoryForm.css";

const AddSubCategoryForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Store categories fetched from the API
  const [category, setCategory] = useState({ id: "" }); // Store the selected category as an object
  const [name, setName] = useState(""); // Store subcategory name
  const [description, setDescription] = useState(""); // Store subcategory description

  // Fetch categories for the dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get/categories");

      // Validate and set categories
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

  // Load categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.id) {
      alert("Please select a category.");
      return;
    }

    const newSubcategory = {
      name: name.trim(),
      description: description.trim(),
      category: { id: category.id }, // Send category as an object with id
    };

    console.log("Payload being sent:", newSubcategory); // Debugging log

    try {
      const response = await axios.post("http://localhost:8081/api/subcategory", newSubcategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Subcategory added successfully!");
      navigate("/adminsubcategory");
    } catch (error) {
      console.error("Error adding subcategory:", error.response?.data || error.message);
      alert(`Failed to add subcategory: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Subcategory</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for selecting a category */}
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

        {/* Input for subcategory name */}
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

        {/* Input for subcategory description */}
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

        <button type="submit">Add Subcategory</button>
      </form>
    </div>
  );
};

export default AddSubCategoryForm;
