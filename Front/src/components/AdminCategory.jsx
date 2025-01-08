
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Importing icons
import './AdminCategory.css';

const AdminCategory = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/get/categories");
            setCategories(res.data.category);
        } catch (error) {
            alert("Failed to fetch categories.");
        }
    };

    const deleteCategory = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8081/api/category/${id}`);
                alert("Category deleted successfully!");
                fetchCategories();
            } catch (error) {
                alert("Failed to delete category. Please try again.");
            }
        }
    };

    const navigateToAdd = () => {
        navigate("/add-category");
    };

    const navigateToUpdate = (categoryId) => {
        navigate(`/update-category/${categoryId}`);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="admin-category-container">
            <h2 className="title">Admin Categories</h2>
            <button className="add-btn" onClick={navigateToAdd}>
                Add Category
            </button>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Category Description</th>
                        <th>Category Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <img src={category.image} alt="category" className="category-img" />
                            </td>
                            <td className="actions">
                                <FaEdit
                                    className="icon update-icon"
                                    onClick={() => navigateToUpdate(category.id)}
                                    title="Edit"
                                />
                                <FaTrashAlt
                                    className="icon delete-icon"
                                    onClick={() => deleteCategory(category.id)}
                                    title="Delete"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminCategory;
