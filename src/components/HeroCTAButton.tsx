import { useState } from "react";
import svgPaths from "@/imports/Frame7/svg-wn9bhywp20";

const BOOKING_Y = 5240;
const HEADER_H = 64;
const SCROLL_OFFSET = 24;

function scrollToBooking() {
  window.scrollTo({ top: BOOKING_Y - HEADER_H - SCROLL_OFFSET, behavior: "smooth" });
}

export default function HeroCTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={scrollToBooking}
      onKeyDown={(e) => e.key === "Enter" && scrollToBooking()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: "841px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "257px",
        height: "64px",
        borderRadius: "100px",
        overflow: "hidden",
        background: hovered
          ? "linear-gradient(-70.82deg, rgb(1, 15, 4) 7.26%, rgb(10, 32, 16) 90.63%)"
          : "linear-gradient(-70.82deg, rgb(2, 36, 9) 7.26%, rgb(24, 78, 36) 90.63%)",
        cursor: "pointer",
        zIndex: 5,
        transition: "background 0.28s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          position: "absolute",
          left: "57px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Serif KR:ExtraBold', sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            color: "white",
            letterSpacing: "-0.32px",
            lineHeight: "normal",
            whiteSpace: "nowrap",
          }}
        >
          상담 예약하기
        </span>

        <div
          style={{
            height: "10px",
            width: "20px",
            position: "relative",
            flexShrink: 0,
            transform: `translateX(${hovered ? "5px" : "0"})`,
            transition: "transform 0.28s ease",
          }}
        >
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            viewBox="0 0 20 10"
            fill="none"
          >
            <path d={svgPaths.p3a250980} fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}
