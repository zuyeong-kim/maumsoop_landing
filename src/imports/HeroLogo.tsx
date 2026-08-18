import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroLogo() {
  const logoRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 모든 선 숨기기
      gsap.set(".logo-line", {
        strokeDasharray: 200,
        strokeDashoffset: 200,
      });

      gsap.set(".logo-comma", {
        opacity: 0,
        scale: 0.6,
        transformOrigin: "center",
      });

// 바닥선
tl.to(".logo-ground", {
  strokeDashoffset: 0,
  duration: 1.1,
  ease: "power1.inOut",
});

// 나무
tl.to(
  ".logo-tree-line",
  {
    strokeDashoffset: 0,
    duration: 0.6,
    stagger: 0.04,
    ease: "power1.inOut",
  },
  "-=0.35"
);

// 외곽 도형
tl.to(
  ".logo-shape",
  {
    strokeDashoffset: 0,
    duration: 1.2,
    stagger: 0.08,
    ease: "power1.inOut",
  },
  "-=0.65"
);

// 쉼표
tl.to(".logo-comma", {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: "power1.out",
});

tl.to(logoRef.current, {
  scale: 0.35,
  opacity: 0,
  filter: "blur(10px)",
  duration: 1.2,
  ease: "power2.in",
  delay: 0.4,
});

    },
    { scope: logoRef }
  );

  return (
    <svg
      ref={logoRef}
      viewBox="0 0 119.35 47.51"
      className="hero-logo w-[600px] h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 네모 */}
      <rect
        className="logo-line logo-shape"
        x=".75"
        y=".75"
        width="30"
        height="30"
        rx="3.4"
        ry="3.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 삼각형 */}
      <path
        className="logo-line logo-shape"
        d="M93.93,2.08l-13.72,23.76c-1.03,1.78,.26,4,2.31,4h27.43c2.05,0,3.34-2.22,2.31-4L98.55,2.08c-1.03-1.78-3.59-1.78-4.62,0Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 원 */}
      <circle
        className="logo-line logo-shape"
        cx="55.99"
        cy="24.41"
        r="15"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
      />

      {/* 가운데 나무 */}
      <g>
        <line
          className="logo-line logo-tree-line"
          x1="55.84"
          y1="25.27"
          x2="55.84"
          y2="46.76"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          className="logo-line logo-tree-line"
          x1="55.84"
          y1="31.71"
          x2="59.82"
          y2="27.73"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          className="logo-line logo-tree-line"
          x1="55.84"
          y1="31.71"
          x2="51.68"
          y2="27.56"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* 왼쪽 나무 */}
      <g>
        <line
          className="logo-line logo-tree-line"
          x1="15.84"
          y1="17.37"
          x2="15.84"
          y2="46.76"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          className="logo-line logo-tree-line"
          x1="15.84"
          y1="23.82"
          x2="19.82"
          y2="19.84"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          className="logo-line logo-tree-line"
          x1="15.84"
          y1="23.82"
          x2="11.68"
          y2="19.66"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* 오른쪽 나무 */}
      <g>
        <line
          className="logo-line logo-tree-line"
          x1="96.33"
          y1="17.86"
          x2="96.33"
          y2="46.76"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          className="logo-line logo-tree-line"
          x1="96.33"
          y1="24.31"
          x2="100.31"
          y2="20.32"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          className="logo-line logo-tree-line"
          x1="96.33"
          y1="24.31"
          x2="92.17"
          y2="20.15"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* 바닥선 */}
      <line
        className="logo-line logo-ground"
        x1=".75"
        y1="46.76"
        x2="112.63"
        y2="46.76"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 쉼표 */}
      <path
        className="logo-comma"
        fill="#ffffff"
        d="M119.35,4.11c0-1.86-1.5-3.36-3.36-3.36s-3.36,1.5-3.36,3.36c0,1.51,1.01,2.78,2.38,3.2h-.03s0,.35-.46,1.13c-.31,.53-1.06,1.2-.8,1.37,.38,.25,2.21-.87,3.18-1.73,1.04-.92,1.64-1.77,1.79-1.98,.41-.56,.66-1.24,.66-1.99Z"
      />
    </svg>
  );
}