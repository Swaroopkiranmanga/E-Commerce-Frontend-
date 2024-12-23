
function Top3() {
    const products = [
      {
        id: 1,
        name: "Product 1",
        price: "$99.99",
        img: "https://via.placeholder.com/300x200?text=Product+1",
      },
      {
        id: 2,
        name: "Product 2",
        price: "$89.99",
        img: "https://via.placeholder.com/300x200?text=Product+2",
      },
      {
        id: 3,
        name: "Product 3",
        price: "$79.99",
        img: "https://via.placeholder.com/300x200?text=Product+3",
      },
      {
        id: 4,
        name: "Product 4",
        price: "$69.99",
        img: "https://via.placeholder.com/300x200?text=Product+4",
      },
      {
        id: 5,
        name: "Product 5",
        price: "$59.99",
        img: "https://via.placeholder.com/300x200?text=Product+5",
      },
      {
        id: 6,
        name: "Product 6",
        price: "$49.99",
        img: "https://via.placeholder.com/300x200?text=Product+6",
      },
      {
        id: 7,
        name: "Product 7",
        price: "$39.99",
        img: "https://via.placeholder.com/300x200?text=Product+7",
      },
      {
        id: 8,
        name: "Product 8",
        price: "$29.99",
        img: "https://via.placeholder.com/300x200?text=Product+8",
      },
      {
        id: 9,
        name: "Product 9",
        price: "$19.99",
        img: "https://via.placeholder.com/300x200?text=Product+9",
      },
      {
        id: 10,
        name: "Product 10",
        price: "$9.99",
        img: "https://via.placeholder.com/300x200?text=Product+10",
      },
      {
        id: 11,
        name: "Product 11",
        price: "$109.99",
        img: "https://via.placeholder.com/300x200?text=Product+11",
      },
      {
        id: 12,
        name: "Product 12",
        price: "$119.99",
        img: "https://via.placeholder.com/300x200?text=Product+12",
      },
    ];
  
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
  