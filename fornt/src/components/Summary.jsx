import React, { useState, useEffect } from "react";
import "./Summary.css";

const Summary = () => {n
  const [sections, setSections] = useState([]);

  // Simulated database fetch (Replace this with your actual API or database call)
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          heading: "Everyday Essentials",
          content:
            "From pulses, spices, dairy, personal and sanitary care, breakfast essentials, health drinks, spreads, ready to cook, grooming to cleaning agents, we present everything you need to run a house.",
        },
        {
          heading: "Exclusive Grocery Deals",
          content: "Now buy grocery products for as low as 1 Rupee only.",
        },
        {
          heading: "Top Brands Available",
          content:
            "Explore top brands like Aashirvaad, Amul, Dettol, Maggi, Tata, and more to fulfill all your household needs.",
        },
        {
          heading: "Best Offers",
          content:
            "Grab exciting discounts and offers on a wide range of products, delivered straight to your doorstep.",
        },
      ];
      setSections(data);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
      <div className="dashboard-sections">
        {sections.map((section, index) => (
          <div key={index} className="dashboard-section">
            <h2 className="section-heading">{section.heading}</h2>
            <p className="section-content">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
