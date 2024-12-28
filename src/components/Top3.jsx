import axios from "axios";
import { useEffect, useState } from "react";

function Top3() {
  const [products, setProducts] = useState([]); 
  const func = async () => {
    const res = await axios.get("http://localhost:8081/api/get/categories");
    let newProducts = [];
    for (const element of res.data.categories) {
      for (const element1 of element.subCategories) {
        newProducts = [...newProducts, ...element1.products];
        setProducts(newProducts);
      }
    }
  };

  useEffect(() => {
    func();
  }, []);  
  return (
    <main className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "black",
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Top3;
