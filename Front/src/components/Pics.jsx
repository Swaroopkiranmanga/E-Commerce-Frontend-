import React from "react";


const Pics = () => {
 
  const items = [
    {
      id: 1,
      name: "Grocery",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMlnfNUBE52qJoWcTjBfAzBq6Nt5ltObqIlQ&s", 
    },
    {
      id: 2,
      name: "Mobiles",
      src: "https://rukminim1.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100",
    },
    {
      id: 3,
      name: "Electronic",
      src: "https://rukminim1.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100", 
    },
    {
      id: 4,
      name: "Fashion",
      src: "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100", 
    },
    {
        id: 5,
        name: "Flight Boookings",
        src: "https://rukminim1.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100", 
      },
      {
        id: 6,
        name: "Toys",
        src: "https://rukminim1.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100", 
      },
      {
        id: 7,
        name: "Fashion",
        src: "https://rukminim1.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100", 
      },
      {
          id: 8,
          name: "Flight Boookings",
          src: "https://rukminim1.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100", 
        },
        {
          id: 9,
          name: "Toys",
          src: "https://rukminim1.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png?q=100", 
        },
  ];
  // This function is called when an image/category is clicked
  const handleClick = (categoryName) => {
    console.log(`${categoryName} clicked!`); // Replace this with actual logic, e.g., navigation or other actions
    // Example: You can trigger navigation or show more details here
  };
 

  return (
    <div className="image-grid">
      {items.map((item) => (
        <div key={item.id} className="image-item" >
          <img src={item.src} alt={item.name} className="image" />
          <p className="image-name">{item.name}</p>
        </div>
      ))}
      <style>
        {`
          .image-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px,1fr));
            gap:34px;
            padding: 10px;
            text-align: center;
            padding-bottom:10px;
            padding-top:100px
  
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

export default Pics;
