
function Top() {
    const products = [
      { id: 1, name: "Product 1", price: "$49.99", img: "https://via.placeholder.com/150?text=Product+1" },
      { id: 2, name: "Product 2", price: "$59.99", img: "https://via.placeholder.com/150?text=Product+2" },
      { id: 3, name: "Product 3", price: "$69.99", img: "https://via.placeholder.com/150?text=Product+3" },
      { id: 4, name: "Product 4", price: "$79.99", img: "https://via.placeholder.com/150?text=Product+4" },
      { id: 5, name: "Product 5", price: "$89.99", img: "https://via.placeholder.com/150?text=Product+5" },
      { id: 6, name: "Product 6", price: "$99.99", img: "https://via.placeholder.com/150?text=Product+6" },
    ];
  
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
  