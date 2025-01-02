function Top2() {
  const cards = [
    {
      id: 1,
      title: "Exclusive Offer",
      description: "Get 50% off on your first purchase. Limited time offer!",
      img: "https://via.placeholder.com/300?text=Your+Image+1",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out the latest collection in our store now.",
      img: "https://via.placeholder.com/300?text=Your+Image+2", 
    },
    {
      id: 3,
      title: "Special Discounts",
      description: "Save big with our seasonal discounts on all products.",
      img: "https://via.placeholder.com/300?text=Your+Image+3", 
    },
  ];

  return (
    <main className="container mt-4">
      <div className="row">
        {cards.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <div
              className="card d-flex flex-row align-items-center"
              style={{
                backgroundColor: "lightblue",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
                width: "100%",
                height: "200px",
              }}
            >
           
              <div
                className="card-text flex-grow-1"
                style={{
                  paddingRight: "20px",
                  fontSize: "16px",
                }}
              >
                <h5 className="card-title" style={{ marginBottom: "10px" }}>
                  {card.title}
                </h5>
                <p className="card-description">{card.description}</p>
              </div>

             
              <div>
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Top2;
