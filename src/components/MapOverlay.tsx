export default function MapOverlay() {
  const mapSrc =
    "https://maps.google.com/maps?q=서울+구로구+새말로+97+6층&t=m&z=16&ie=UTF8&iwloc=near&output=embed";

  return (
    <div
      style={{
        position: "absolute",
        top: "127px",
        left: "480px",
        width: "800px",
        height: "540px",
        borderRadius: "35px",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      <iframe
        src={mapSrc}
        title="마음숲 위치 지도"
        width="100%"
        height="100%"
        style={{ border: "none", display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}