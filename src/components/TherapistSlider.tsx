import { useState, useEffect, useRef, useCallback } from "react";
import therapistImg from "@/imports/Frame7/f760dd3c1646ab1859d4ad717a1b9b43550c6574.png";
import img2 from "@/imports/be3c3529-bf6e-4512-bf14-9cff2e72f5ab.png";
import img3 from "@/imports/9312911f-59d2-4933-87c4-1d557da62db2.png";

const THERAPISTS = [
  {
    name: "김하늘",
    title: "선생님",
    tags: ["#성인상담", "#커플상담", "#부부상담", "#가족상담"],
    career: [
      "허그맘허그인 심리상담센터 개인. 가족. EAP상담",
      "정다운상담클리닉 개인. 부부상담",
      "라이트인유상담센터 개인. 부부. 영어상담",
      "경북대학교 교육학과 강의 (학부 및 대학원)",
      "한국프로스포츠협회 프로스포츠 경기인 대상 상담",
    ],
    image: therapistImg,
  },
  {
    name: "이서연",
    title: "선생님",
    tags: ["#청소년상담", "#트라우마", "#우울상담", "#불안상담"],
    career: [
      "마음나눔 심리상담센터 개인. 청소년상담",
      "서울대학교 학생상담센터 상담",
      "삼성병원 정신건강 프로그램 진행",
      "한양대학교 심리학과 강의",
      "한국심리학회 공인 임상심리전문가",
    ],
    image: img2,
  },
  {
    name: "박지현",
    title: "선생님",
    tags: ["#직장상담", "#번아웃", "#자존감", "#자기성장"],
    career: [
      "마음숲 심리상담센터 수석 상담사",
      "기업 EAP 상담 전문가 (삼성, LG, SK 등)",
      "연세대학교 상담코칭학 박사",
      "한국상담학회 공인 수련감독자",
      "직장인 번아웃 집단상담 프로그램 개발",
    ],
    image: img3,
  },
];

const AUTO_INTERVAL = 10_000;
const SLIDE_W = 1920;
const ANIM_DURATION = 700; // ms
const ANIM_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
const GREEN = "#0c2d13";

/* ── Single therapist profile slide (1920 px wide) ── */
function TherapistProfile({ therapist }: { therapist: (typeof THERAPISTS)[number] }) {
  return (
    <div style={{ position: "relative", width: `${SLIDE_W}px`, height: "568px", flexShrink: 0 }}>
      {/* Image – right side */}
      <div
        style={{
          position: "absolute",
          left: "1207px",
          top: 0,
          width: "393px",
          height: "552px",
        }}
      >
        <img
          src={therapist.image}
          alt={therapist.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
        />
      </div>

      {/* Info – left side */}
      <div
        style={{
          position: "absolute",
          left: "320px",
          top: "229px",
          width: "390px",
          display: "flex",
          flexDirection: "column",
          gap: "36px",
        }}
      >
        {/* Name + tags */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", width: "318px", whiteSpace: "nowrap" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "flex-end",
              fontFamily: "'Noto Serif KR:SemiBold', sans-serif",
              fontWeight: 600,
              color: "#0c2d13",
            }}
          >
            <span style={{ fontSize: "36px", letterSpacing: "-0.72px" }}>{therapist.name}</span>
            <span style={{ fontSize: "24px", letterSpacing: "-0.48px" }}>{therapist.title}</span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontFamily: "'Pretendard:Regular', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              color: "#5b6b5e",
              letterSpacing: "-0.36px",
            }}
          >
            {therapist.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Career list */}
        <ul
          style={{
            fontFamily: "'Pretendard:Regular', sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            color: "#2b2b2b",
            letterSpacing: "-0.36px",
            lineHeight: 1.63,
            listStyleType: "disc",
            paddingLeft: "27px",
            margin: 0,
          }}
        >
          {therapist.career.map((item, i) => (
            <li key={i} style={{ marginBottom: 0 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Arrow button ── */
function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = !disabled && hovered;

  const ring = (
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "100px",
        border: `1px solid ${isActive ? GREEN : "#616161"}`,
        overflow: "hidden",
        position: "relative",
        background: isActive ? GREEN : "transparent",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "15px",
          top: "15px",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: "rotate(90deg)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20V4M6 10L12 4L18 10"
              stroke={isActive ? "white" : "#616161"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.2s ease" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "opacity 0.18s ease",
      }}
    >
      {direction === "prev" ? <div style={{ transform: "rotate(180deg)" }}>{ring}</div> : ring}
    </button>
  );
}

/* ── Main slider ── */
export default function TherapistSlider() {
  const [current, setCurrent] = useState(0);

  /*
   * anim state drives the carousel track:
   *   slides  – ordered list of indices to render in the flex track
   *   startX  – initial track translateX (applied instantly, no transition)
   *   endX    – target translateX (CSS transition kicks in)
   */
  const [anim, setAnim] = useState<{
    slides: number[];
    startX: number;
    endX: number;
    phase: "setup" | "run";
    incoming: number;
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockRef = useRef(false);

  const isPrevDisabled = current === 0 || lockRef.current;
  const isNextDisabled = current === THERAPISTS.length - 1 || lockRef.current;

  /* Core transition logic */
  const goTo = useCallback((nextIndex: number, direction: "next" | "prev") => {
    if (lockRef.current) return;
    lockRef.current = true;

    if (direction === "next") {
      // [current, incoming] — start at 0, slide to -SLIDE_W
      setAnim({ slides: [current, nextIndex], startX: 0, endX: -SLIDE_W, phase: "setup", incoming: nextIndex });
    } else {
      // [incoming, current] — start at -SLIDE_W, slide to 0
      setAnim({ slides: [nextIndex, current], startX: -SLIDE_W, endX: 0, phase: "setup", incoming: nextIndex });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  /* After "setup" phase renders, flip to "run" to trigger CSS transition */
  useEffect(() => {
    if (anim?.phase !== "setup") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnim((prev) => prev ? { ...prev, phase: "run" } : null);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [anim?.phase]);

  /* Transition end → commit new index, clear anim */
  const handleTransitionEnd = () => {
    if (!anim) return;
    setCurrent(anim.incoming);
    setAnim(null);
    lockRef.current = false;
  };

  /* Auto-advance timer */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % THERAPISTS.length;
        if (!lockRef.current) {
          lockRef.current = true;
          const direction: "next" = "next";
          setAnim({
            slides: [prev, next],
            startX: 0,
            endX: -SLIDE_W,
            phase: "setup",
            incoming: next,
          });
          // direction variable used only to document intent; goTo would re-read stale `current`
          void direction;
        }
        return prev;
      });
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handlePrev = () => {
    if (current === 0 || lockRef.current) return;
    goTo(current - 1, "prev");
    resetTimer();
  };

  const handleNext = () => {
    if (current === THERAPISTS.length - 1 || lockRef.current) return;
    goTo(current + 1, "next");
    resetTimer();
  };

  /* What the carousel track shows */
  const trackSlides = anim ? anim.slides : [current];
  const trackX = anim
    ? anim.phase === "run"
      ? anim.endX
      : anim.startX
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        top: "4470px",
        left: 0,
        width: `${SLIDE_W}px`,
        height: "700px",
        background: "linear-gradient(to bottom, #ffffff 0%, #f5faf6 100%)",
        zIndex: 10,
        borderRadius: "0px 0px 200px 200px",
      }}
    >
      {/* Section heading – static */}
      <p
        style={{
          position: "absolute",
          left: "320px",
          top: "20px",
          fontFamily: "'Noto Serif KR:ExtraBold', sans-serif",
          fontWeight: 800,
          fontSize: "36px",
          color: "#0c2d13",
          lineHeight: "normal",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        당신의 이야기를 듣는 사람들
      </p>

      {/* Subtitle – static */}
      <p
        style={{
          position: "absolute",
          left: "320px",
          top: "83px",
          fontFamily: "'Noto Serif KR', sans-serif",
          fontWeight: 400,
          fontSize: "18px",
          color: "#5b6b5e",
          lineHeight: 1.6,
          letterSpacing: "-0.36px",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        전문적인 경험과 따뜻한 시선으로
        <br />
        당신의 마음 곁에 함께합니다.
      </p>

      {/* ── Carousel clip window ── */}
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: 0,
          width: `${SLIDE_W}px`,
          height: "568px",
          overflow: "hidden",
        }}
      >
        {/* Sliding track */}
        <div
          style={{
            display: "flex",
            transform: `translateX(${trackX}px)`,
            transition: anim?.phase === "run"
              ? `transform ${ANIM_DURATION}ms ${ANIM_EASING}`
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {trackSlides.map((idx, i) => (
            <TherapistProfile key={`${i}-${idx}`} therapist={THERAPISTS[idx]} />
          ))}
        </div>
      </div>

      {/* Navigation – static, below the carousel window */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "556px",
          display: "flex",
          gap: "18px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Pagination */}
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            fontSize: "18px",
            lineHeight: 1.63,
            letterSpacing: "-0.36px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontFamily: "'Pretendard:SemiBold', sans-serif", fontWeight: 600, color: "#2b2b2b" }}>
            {(anim?.incoming ?? current) + 1}
          </span>
          <span style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontWeight: 400, color: "#616161" }}>/</span>
          <span style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontWeight: 400, color: "#616161" }}>
            {THERAPISTS.length}
          </span>
        </div>

        {/* Arrows */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <ArrowButton direction="prev" disabled={isPrevDisabled} onClick={handlePrev} />
          <ArrowButton direction="next" disabled={isNextDisabled} onClick={handleNext} />
        </div>
      </div>
    </div>
  );
}
