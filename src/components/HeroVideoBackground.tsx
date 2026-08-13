// @ts-ignore — Vite resolves mp4 as a URL asset
import heroVideoUrl from "@/imports/Firefly_______________________________._____________--_____________________--_________________________1_.mp4?url";
import heroPoster from "@/imports/Frame7/e3fb5059af4c0bd3aa7a3bb0f0691b82a82cc91e.png";

export default function HeroVideoBackground() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "1920px",
        height: "1081px",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={heroVideoUrl as string} type="video/mp4" />
        {/* fallback: poster image is shown automatically if video cannot play */}
      </video>

      {/* Dark overlay matching original rgba(32,39,28,0.8) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(32, 39, 28, 0.8)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
