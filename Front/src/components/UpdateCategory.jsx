import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CategoryForm.css";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/category/${id}`);
        setFormData({
          name: res.data.name,
          description: res.data.description,
        });
        setPreview(res.data.image);
      } catch (error) {
        console.error("Error fetching category details:", error);
        alert("Failed to fetch category details.");
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("Image file size must not exceed 2MB.");
      return;
    }
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append(
        "category",
        new Blob([JSON.stringify(formData)], { type: "application/json" })
      );
      if (image) {
        formDataToSubmit.append("image", image);
      }

      await axios.put(`http://localhost:8081/api/category/${id}`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category updated successfully!");
      navigate("/admin-categories");
    } catch (error) {
      console.error("Error updating category:", error.response?.data || error.message);
      alert("Failed to update category. Please try again.");
    }
  };

  return (
    <div className="category-form-container">
      <h2 className="title">Update Category</h2>
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
          <button type="submit" className="save-btn">Update</button>
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

export default UpdateCategory;

