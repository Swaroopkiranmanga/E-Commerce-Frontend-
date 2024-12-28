import axios from "axios";
import { useEffect, useState } from "react";

function Top() {
    const [products, setProducts] = useState([]); 
    const func = async () => {
      const res = await axios.get("http://localhost:8081/api/get/categories");
      let newProducts = [];
      let counter=0;             
      for (const element of res.data.categories) {
        for (const element1 of element.subCategories) {
          newProducts = [...newProducts, ...element1.products];
          counter += element1.products.length;
          if(counter>=7){
            newProducts = newProducts.slice(0, 7);
            break;
          }
          setProducts(newProducts)
          if(counter>=7) break;
        }
      }
    };
  
  useEffect(() => {
      func();
    }, []);
    return (
      <main className="container mt-4">
      
        <h2 className="text-center mb-4">Top Picks</h2>
  
        <div className="row">
         
          <div className="col-md-12 d-flex justify-content-between flex-wrap">
            {products.map((product) => (
              <div key={product.id} className="card" style={{ width: "16%" }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
export default Top;
  