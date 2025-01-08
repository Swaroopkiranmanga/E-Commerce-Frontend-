import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoryForm.css";

const AddCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("Image file size must not exceed 2MB.");
      return;
    }
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSubmit = new FormData();
    
    // Create the category object and append it as a JSON string
    const category = {
      name: formData.name,
      description: formData.description,
    };
    formDataToSubmit.append("category", new Blob([JSON.stringify(category)], { type: "application/json" }));

    // Append the image file if present
    if (image) {
      formDataToSubmit.append("image", image);
    }

    // Send the request to the backend
    const response = await axios.post("http://localhost:8081/api/category", formDataToSubmit, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Category added successfully!");
    navigate("/admin-categories"); // Redirect to the categories page
  } catch (error) {
    console.error("Error adding category:", error.response?.data || error.message);
    alert(`Failed to add category: ${error.response?.data?.message || error.message}`);
  }
};


  return (
    <div className="category-form-container">
      <h2 className="title">Add Category</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label>Category Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
        </div>
        <div className="form-group">
          <label>Category Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Category Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
        <div className="form-actions">
          <button type="submit" className="save-btn">Add</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin-categories")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;