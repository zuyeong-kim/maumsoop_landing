import { useState } from "react";
import svgPaths from "@/imports/Frame7/svg-wn9bhywp20";

/* ── Scroll helper ── */
const HEADER_H = 64;
const SCROLL_OFFSET = 24; // extra breathing room below header

function scrollTo(y: number) {
  window.scrollTo({ top: Math.max(0, y - HEADER_H - SCROLL_OFFSET), behavior: "smooth" });
}

/* Section targets (absolute page px, based on design coordinates) */
const SECTIONS = {
  hero:        0,
  intro:    1377,   // 요즘, 이런 마음으로
  programs: 3110,   // 당신의 마음에 맞는 상담
  therapist: 4470,  // 상담사 슬라이더 오버레이
  booking:   5240,  // 상담예약 폼 오버레이
  directions: 6198, // 오시는길 (Frame40: 2966+3232)
};

/* ── Logo SVG (Asset 7) – same paths used in the import ── */
function LogoMark() {
  return (
    <div style={{ width: "75px", height: "30px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        fill="none"
        viewBox="0 0 75 29.9937"
        preserveAspectRatio="none"
      >
        <path d={svgPaths.p230e5280} fill="#022409" />
        <path d={svgPaths.p39f01000} fill="#022409" />
      </svg>
    </div>
  );
}

/* ── 상담 예약 button (Component1 Frame 51 variant) ── */
function BookingButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: "1493px",
        top: "50%",
        transform: `translateY(calc(-50% ${hovered ? "- 3px" : "+ 0px"}))`,
        width: "107px",
        height: "48px",
        borderRadius: "100px",
        overflow: "hidden",
        backgroundImage: hovered
          ? "linear-gradient(-70.82deg, rgb(24, 78, 36) 7.26%, rgb(2, 36, 9) 90.63%)"
          : "linear-gradient(-70.82deg, rgb(2, 36, 9) 7.26%, rgb(24, 78, 36) 90.63%)",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, background-image 0.25s ease",
        boxShadow: hovered ? "0 6px 18px rgba(2, 36, 9, 0.32)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: "'Pretendard:Bold', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          color: "white",
          lineHeight: "normal",
          whiteSpace: "nowrap",
        }}
      >
        상담 예약
      </span>
    </button>
  );
}

/* ── Single nav item ── */
function NavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "'Pretendard:SemiBold', sans-serif",
        fontWeight: 600,
        fontSize: "16px",
        color: "#0c2d13",
        lineHeight: "normal",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

/* ── Header overlay ── */
export default function SiteHeader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        minWidth: "1920px",
        height: `${HEADER_H}px`,
        background: "white",
        boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.08)",
        zIndex: 100,
      }}
    >
      {/* Inner 1920px layout frame */}
      <div style={{ position: "relative", width: "1920px", height: "100%", margin: "0 auto" }}>

        {/* Logo */}
        <button
          onClick={() => scrollTo(SECTIONS.hero)}
          style={{
            position: "absolute",
            left: "320px",
            top: "17px",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            gap: "14px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoMark />
          <span
            style={{
              fontFamily: "'Noto Serif KR:Medium', sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              color: "#0c2d13",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            마음숲
          </span>
        </button>

        {/* Nav items – centered */}
        <nav
          style={{
            position: "absolute",
            left: "50%",
            top: "29px",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <NavItem label="마음숲 소개"  onClick={() => scrollTo(SECTIONS.intro)} />
          <NavItem label="프로그램"     onClick={() => scrollTo(SECTIONS.programs)} />
          <NavItem label="상담사 소개"  onClick={() => scrollTo(SECTIONS.therapist)} />
          <NavItem label="오시는길"     onClick={() => scrollTo(SECTIONS.directions)} />
        </nav>

        {/* 상담 예약 button */}
        <BookingButton onClick={() => scrollTo(SECTIONS.booking)} />
      </div>
    </div>
  );
}
