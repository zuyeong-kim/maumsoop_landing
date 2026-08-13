/* Interactive map replacing the gray placeholder (Frame34) in the 오시는길 section.
   Frame34 position within page: top = 2966 (Frame75) + 3232 (Frame40) + 127 = 6325px,
   left = 800px, width = 800px, height = 540px, border-radius = 35px.
   Address shown in the design is a placeholder (서울 ○○구 ○○로 00, 3층). */
export default function MapOverlay() {
  const mapSrc =
    "https://maps.google.com/maps?q=%EC%84%9C%EC%9A%B8%EC%8B%9C+%EB%A7%88%ED%8F%AC%EA%B5%AC+%ED%86%A0%EC%A0%95%EB%A1%9C&t=m&z=16&ie=UTF8&iwloc=near&output=embed";

  return (
    <div
      style={{
        position: "absolute",
        top: "6325px",
        left: "800px",
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
