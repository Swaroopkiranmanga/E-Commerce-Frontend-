import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminSubCategory.css";

const AdminSubCategory = () => {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubcategories = async (page = 0) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8081/api/get/categories?page=${page}&size=${itemsPerPage}`
      );
      const { category, totalPages } = res.data;

      if (category && Array.isArray(category)) {
        let subcategoryList = [];
        for (let cat of category) {
          if (cat.subCategory && Array.isArray(cat.subCategory)) {
            for (let subcat of cat.subCategory) {
              subcategoryList.push({
                ...subcat,
                categoryId: cat.id,
                categoryName: cat.name,
              });
            }
          }
        }
        setSubcategories(subcategoryList);
        setTotalPages(totalPages);
        setCurrentPage(page);
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
        fetchSubcategories(currentPage);
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory.");
      }
    }
  };

  const navigateToAddForm = () => {
    navigate("/add-subcategory");
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      fetchSubcategories(page);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  return (
    <>
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
          <>
            <table className="subcategory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {subcategories.map((subCategory) => (
                  <tr key={subCategory.id}>
                    <td>{subCategory.id}</td>
                    <td>{subCategory.name}</td>
                    <td>{subCategory.description}</td>
                    <td>{subCategory.categoryName}</td>
                    <td>
                      <span
                        className="fa fa-edit edit-icon"
                        onClick={() => navigateToUpdateForm(subCategory.id)}
                      ></span>
                    </td>
                    <td>
                      <span
                        className="fa fa-trash delete-icon"
                        onClick={() => deleteSubcategory(subCategory.id)}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index ? "active" : ""}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminSubCategory;
