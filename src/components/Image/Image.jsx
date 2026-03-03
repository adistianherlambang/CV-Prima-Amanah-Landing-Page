import "./Image.css"

export default function Image() {
  return(
    <div style={{
      width: "100%",
      display: "flex",
      gap: "1rem"
    }}>
      <div style={{
        width: "50%",
        display: "flex",
        gap: "1rem"
      }}>
        <img style={{
          width: "100%",
          borderRadius: "1rem"
        }} src="/image/img1.webp" alt="photos" />
        <img style={{
          width: "100%",
          borderRadius: "1rem"
        }} src="/image/img2.webp" alt="photos" />
      </div>
      <div style={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <img style={{
          width: "100%",
          borderRadius: "1rem"
        }} src="/image/img3.webp" alt="photos" />
        <img style={{
          width: "100%",
          borderRadius: "1rem"
        }} src="/image/img4.webp" alt="photos" />
      </div>
    </div>
  )
}