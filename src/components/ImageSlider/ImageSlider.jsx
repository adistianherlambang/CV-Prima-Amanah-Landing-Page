import { useState, useEffect } from "react";

const images = [
  "/slider/img1.webp",
  "/slider/img2.webp",
  "/slider/img3.webp",
  "/slider/img4.webp",
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      
      {/* Slider */}
      <div 
        style={{
          overflow: "hidden",
          height: "30rem",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${images.length * 100}%`,
            transform: `translateX(-${current * (100 / images.length)}%)`,
            transition: "transform 0.6s ease",
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: `${100 / images.length}%`,
                
              }}
            />
          ))}
        </div>
      </div>

      {/* dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: current === index ? "2rem" : "10px",
              height: "10px",
              borderRadius: "1rem",
              backgroundColor: "#5996FD",
              opacity: current === index ? 1 : 0.2,
              cursor: "pointer",
              transition: "0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;