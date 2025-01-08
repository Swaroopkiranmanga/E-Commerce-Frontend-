import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSubCategory.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing Font Awesome icons

const AdminSubCategory = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8081/api/get/categories");
      if (res.data.category && Array.isArray(res.data.category)) {
        let subcategoryList = [];
        for (let category of res.data.category) {
          if (category.subCategory && Array.isArray(category.subCategory)) {
            for (let subcategory of category.subCategory) {
              subcategoryList.push({
                ...subcategory,
                categoryId: category.id,
                categoryName: category.name,
              });
            }
          }
        }
        setSubcategories(subcategoryList);
      } else {
        console.error("Invalid category data format:", res.data);
        alert("Failed to fetch subcategories. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      alert("Failed to fetch subcategories.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToUpdateForm = (id) => {
    navigate(`/edit-subcategory/${id}`);
  };

  const deleteSubcategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`http://localhost:8081/api/subcategory/${id}`);
        alert("Subcategory deleted successfully!");
        fetchSubcategories();
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory.");
      }
    }
  };

  const navigateToAddForm = () => {
    navigate("/add-subcategory");
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  return (
    <div className="admin-subcategory-container">
      <div className="admin-header">
        <h1>Manage Subcategories</h1>
        <button className="add-subcategory-btn" onClick={navigateToAddForm}>
          Add Subcategory
        </button>
      </div>

      {isLoading ? (
        <p>Loading subcategories...</p>
      ) : subcategories.length === 0 ? (
        <p>No subcategories available.</p>
      ) : (
        <table className="subcategory-table">
          <thead>
            <tr>
              <th>Subcategory Name</th>
              <th>Description</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td>{subCategory.name}</td>
                <td>{subCategory.description}</td>
                <td>{subCategory.categoryName}</td>
                <td className="actions">
                  <FaEdit
                    className="icon update-icon"
                    onClick={() => navigateToUpdateForm(subCategory.id)}
                  />
                  <FaTrashAlt
                    className="icon delete-icon"
                    onClick={() => deleteSubcategory(subCategory.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSubCategory;
