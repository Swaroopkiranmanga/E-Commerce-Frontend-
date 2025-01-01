import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownItem } from "react-bootstrap";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/get/categories") // Replace with your backend URL
      .then((response) => {
        setCategories(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="image-grid">
      {categories.map((item) => (
        <div key={item.id} className="image-item">
          <img src={item.image} alt={item.name} className="image" />
          <p
            className="image-name"
            onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
            style={{ cursor: "pointer", marginBottom: "0" }}
          >
            {item.name}
          </p>
          {openDropdown === item.id && (
            <Dropdown show>
              <DropdownMenu>
                {item.subCategory.map((subItem) => (
                  <DropdownItem key={subItem.id} as={Link} to={`/products/${subItem.id}`}>
                    {subItem.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      ))}
      <style>
        {`
          .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 34px;
            padding: 10px;
            text-align: center;
            padding-bottom: 10px;
            padding-top: 100px;
          }

          .image-item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .image {
            width: 100px; /* Adjust the size as needed */
            height: 65px;
            object-fit: cover; /* Ensures the image fits within the box */
            border-radius: 8px; /* Optional: Adds rounded corners */
          }

          .image-name {
            margin-top: 10px;
            font-size: 16px;
            color: #333; 
          }
        `}
      </style>
    </div>
  );
};

export default CategoryComponent;
