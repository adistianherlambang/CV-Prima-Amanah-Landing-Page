import "./Image.css";

export default function Image() {
  return (
    <div className="imageContainer">
      <div className="imageLeft">
        <img id="image1" src="/image/img1.webp" alt="photos" />
        <img id="image2" src="/image/img2.webp" alt="photos" />
      </div>
      <div className="imageRight">
        <img id="image3" src="/image/img3.webp" alt="photos" />
        <img id="image4" src="/image/img4.webp" alt="photos" />
      </div>
    </div>
  );
}