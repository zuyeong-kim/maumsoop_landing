import { useState, useId } from "react";

/* ── Design tokens ── */
const GREEN = "#0c2d13";
const BORDER = "#cfd9d1";
const LABEL_COLOR = "#0c2d13";
const ERROR_COLOR = "#ff383c";
const INPUT_BG = "#fbfbfb";
const TEXT_MAIN = "#2b2b2b";

/* ── Today's date-time string for min attribute ── */
const todayMin = (() => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00`;
})();

/* ── Shared input style ── */
const inputBase = (hasError: boolean, extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: "100%",
  height: "40px",
  background: INPUT_BG,
  border: `1px solid ${hasError ? ERROR_COLOR : BORDER}`,
  borderRadius: "6px",
  fontFamily: "'Pretendard:Regular', sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  color: TEXT_MAIN,
  padding: "0 12px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.18s ease",
  ...extra,
});

/* ── Field label ── */
function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
      <span style={{ fontFamily: "'Pretendard:Medium', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: 1.6, color: LABEL_COLOR }}>
        {children}
      </span>
      {required && (
        <span style={{ fontFamily: "'Pretendard:Medium', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: 1.6, color: ERROR_COLOR }}>
          *
        </span>
      )}
    </div>
  );
}

/* ── Inline error — always occupies space so layout doesn't jump ── */
function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p
      style={{
        margin: "4px 0 0 0",
        minHeight: "18px",
        fontFamily: "'Pretendard:Regular', sans-serif",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: 1.5,
        color: ERROR_COLOR,
        opacity: msg ? 1 : 0,
        transition: "opacity 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {msg || " "}
    </p>
  );
}

/* ── Validation ── */
const validateName = (v: string) => {
  if (!v.trim()) return "이름을 입력해주세요.";
  if (/[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(v)) return "이름은 문자만 입력 가능합니다.";
  return "";
};
const validatePhone = (v: string) => {
  if (!v.trim()) return "연락처를 입력해주세요.";
  if (!/^\d+$/.test(v)) return "숫자만 입력해주세요.";
  if (v.length < 10 || v.length > 11) return "올바른 연락처를 입력해주세요.";
  return "";
};
const validateDatetime = (v: string) => {
  if (!v) return "방문 희망 일시를 선택해주세요.";
  return "";
};

/* ── Privacy policy modal ── */
const PRIVACY_SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "이름, 연락처(전화번호), 방문 희망 일시, 상담 내용",
  },
  {
    title: "2. 개인정보 수집 목적",
    body: "상담 예약 접수 및 일정 확인 안내, 예약 변경·취소 안내 등 상담 서비스 제공",
  },
  {
    title: "3. 개인정보 보유 및 이용 기간",
    body: "상담 종료 후 1년간 보관하며, 이후 지체 없이 파기합니다. 단, 관련 법령에 의해 보존할 필요가 있는 경우 해당 기간 동안 보관합니다.",
  },
  {
    title: "4. 동의 거부 안내",
    body: "개인정보 수집·이용에 대한 동의를 거부하실 수 있으며, 거부 시 상담 예약 서비스 이용이 제한될 수 있습니다.",
  },
];

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "520px",
          maxHeight: "80vh",
          background: "white",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 32px 20px",
            borderBottom: `1px solid ${BORDER}`,
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'Noto Serif KR:SemiBold', sans-serif", fontWeight: 600, fontSize: "20px", color: GREEN }}>
            개인정보 수집 및 이용 동의
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#616161",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 32px", overflowY: "auto" }}>
          <p style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontWeight: 400, fontSize: "14px", color: "#5b6b5e", lineHeight: 1.7, margin: "0 0 24px" }}>
            마음숲 심리상담센터(이하 '센터')는 상담 예약 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.
          </p>

          {PRIVACY_SECTIONS.map((s) => (
            <div key={s.title} style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "'Pretendard:SemiBold', sans-serif", fontWeight: 600, fontSize: "15px", color: GREEN, lineHeight: 1.5, margin: "0 0 6px" }}>
                {s.title}
              </p>
              <p style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontWeight: 400, fontSize: "14px", color: TEXT_MAIN, lineHeight: 1.7, margin: 0 }}>
                {s.body}
              </p>
            </div>
          ))}

          <p style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontWeight: 400, fontSize: "13px", color: "#9e9e9e", lineHeight: 1.6, margin: "8px 0 0" }}>
            위 내용에 동의하시면 예약 신청이 가능합니다.
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: "0 32px 28px", flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              height: "52px",
              background: GREEN,
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              fontFamily: "'Pretendard:SemiBold', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              color: "white",
              letterSpacing: "-0.32px",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Success view ── */
function SuccessView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "659px", gap: "24px", padding: "40px", textAlign: "center" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 12L10 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p style={{ fontFamily: "'Noto Serif KR:SemiBold', sans-serif", fontWeight: 600, fontSize: "20px", color: GREEN, lineHeight: 1.6, margin: 0 }}>
        제출이 완료되었습니다.
        <br />
        확인 후 연락드릴게요.
      </p>
      <p style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontWeight: 400, fontSize: "14px", color: "#5b6b5e", lineHeight: 1.6, margin: 0 }}>
        입력하신 연락처로 상담 일정을 안내해드립니다.
      </p>
    </div>
  );
}

/* ── Custom checkbox ── */
function Checkbox({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <div style={{ position: "relative", width: "16px", height: "16px", flexShrink: 0 }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", margin: 0, cursor: "pointer", zIndex: 1 }}
      />
      <div
        style={{
          width: "16px",
          height: "16px",
          border: `1px solid ${checked ? GREEN : "#5b6b5e"}`,
          borderRadius: "3px",
          background: checked ? GREEN : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s ease, border-color 0.15s ease",
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AppointmentForm() {
  const nameId = useId();
  const phoneId = useId();
  const datetimeId = useId();
  const contentId = useId();
  const consentId = useId();

  const [values, setValues] = useState({ name: "", phone: "", datetime: "", content: "", consent: false });
  const [touched, setTouched] = useState({ name: false, phone: false, datetime: false });
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const errors = {
    name: validateName(values.name),
    phone: validatePhone(values.phone),
    datetime: validateDatetime(values.datetime),
  };

  const showErr = (f: keyof typeof touched) => (touched[f] || submitted ? errors[f] : "");

  const isValid = !errors.name && !errors.phone && !errors.datetime && values.consent;

  const touch = (f: keyof typeof touched) => setTouched((p) => ({ ...p, [f]: true }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;
    setDone(true);
  };

  /* Outer card — no overflow:hidden, height auto so errors don't clip */
  const cardStyle: React.CSSProperties = {
    position: "absolute",
    top: "5240px",
    left: "934px",
    width: "567px",
    minHeight: "659px",
    background: "white",
    border: `1px solid ${BORDER}`,
    borderRadius: "25px",
    zIndex: 10,
  };

  if (done) return <div style={cardStyle}><SuccessView /></div>;

  /* ── inner padding: 50px top, 53px left/right, 52px bottom ── */
  const inner: React.CSSProperties = { padding: "50px 54px 52px 53px" };
  const gap = (px: number): React.CSSProperties => ({ marginTop: `${px}px` });
  const fieldW = 460; /* name, content */
  const halfW = 220;  /* phone, date */

  return (
    <>
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}

      <div style={cardStyle}>
        <form onSubmit={handleSubmit} noValidate style={inner}>

          {/* ── 이름 ── */}
          <div>
            <label htmlFor={nameId}><FieldLabel required>이름</FieldLabel></label>
            <div style={{ marginTop: "12px" }}>
              <input
                id={nameId}
                type="text"
                value={values.name}
                placeholder="홍길동"
                onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))}
                onBlur={() => touch("name")}
                style={inputBase(!!showErr("name"), { width: `${fieldW}px` })}
              />
            </div>
            <ErrorMsg msg={showErr("name")} />
          </div>

          {/* ── 연락처 + 방문희망 일시 ── gap matches original 25px between sections */}
          <div style={{ ...gap(25), display: "flex", gap: "20px", alignItems: "flex-start" }}>
            {/* 연락처 */}
            <div style={{ width: `${halfW}px` }}>
              <label htmlFor={phoneId}><FieldLabel required>연락처</FieldLabel></label>
              <div style={{ marginTop: "12px" }}>
                <input
                  id={phoneId}
                  type="tel"
                  inputMode="numeric"
                  value={values.phone}
                  placeholder="-없이 숫자만"
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 11);
                    setValues((p) => ({ ...p, phone: v }));
                  }}
                  onBlur={() => touch("phone")}
                  style={inputBase(!!showErr("phone"), { width: `${halfW}px` })}
                />
              </div>
              <ErrorMsg msg={showErr("phone")} />
            </div>

            {/* 방문희망 일시 */}
            <div style={{ width: `${halfW}px` }}>
              <label htmlFor={datetimeId}><FieldLabel required>방문희망 일시</FieldLabel></label>
              <div style={{ marginTop: "12px", position: "relative", width: `${halfW}px` }}>
                {/* Custom placeholder shown when no value is selected */}
                {!values.datetime && (
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontFamily: "'Pretendard:Regular', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#c9cdca",
                      pointerEvents: "none",
                      zIndex: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    날짜/시간 선택
                  </span>
                )}
                <input
                  id={datetimeId}
                  type="datetime-local"
                  min={todayMin}
                  value={values.datetime}
                  onChange={(e) => setValues((p) => ({ ...p, datetime: e.target.value }))}
                  onBlur={() => touch("datetime")}
                  style={{
                    ...inputBase(!!showErr("datetime"), { width: `${halfW}px`, paddingRight: "8px" }),
                    colorScheme: "light",
                    /* Hide browser's empty-state text so our placeholder shows */
                    color: values.datetime ? TEXT_MAIN : "transparent",
                  } as React.CSSProperties}
                />
              </div>
              <ErrorMsg msg={showErr("datetime")} />
            </div>
          </div>

          {/* ── 상담내용 ── */}
          <div style={gap(25)}>
            <label htmlFor={contentId}><FieldLabel>상담내용</FieldLabel></label>
            <div style={{ marginTop: "12px" }}>
              <textarea
                id={contentId}
                value={values.content}
                placeholder="상담받고 싶으신 문제를 간단히 적어주세요."
                onChange={(e) => setValues((p) => ({ ...p, content: e.target.value }))}
                style={{
                  width: `${fieldW}px`,
                  height: "200px",
                  background: INPUT_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: "6px",
                  fontFamily: "'Pretendard:Regular', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: TEXT_MAIN,
                  padding: "12px 15px",
                  outline: "none",
                  resize: "none",
                  boxSizing: "border-box",
                  lineHeight: 1.6,
                  transition: "border-color 0.18s ease",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* ── 개인정보 동의 ── left offset +9px to match original left:62px */}
          <div style={{ ...gap(16), marginLeft: "9px", display: "flex", gap: "3px", alignItems: "center" }}>
            <label
              htmlFor={consentId}
              style={{ display: "flex", gap: "6px", alignItems: "center", cursor: "pointer" }}
            >
              <Checkbox
                id={consentId}
                checked={values.consent}
                onChange={(v) => setValues((p) => ({ ...p, consent: v }))}
              />
              <span style={{ fontFamily: "'Pretendard:Medium', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: 1.6, color: LABEL_COLOR, whiteSpace: "nowrap" }}>
                개인정보 수집 및 이용 동의
              </span>
            </label>

            {/* 자세히 보기 – separate from label so click doesn't toggle checkbox */}
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              style={{
                background: "none",
                border: "none",
                padding: "0 2px",
                cursor: "pointer",
                fontFamily: "'Pretendard:Medium', sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#5b6b5e",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                whiteSpace: "nowrap",
              }}
            >
              [자세히 보기]
            </button>

            <span style={{ fontFamily: "'Pretendard:Medium', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: 1.6, color: ERROR_COLOR }}>*</span>
          </div>

          {/* ── 제출 버튼 ── */}
          <div style={{ ...gap(18), display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                width: "461px",
                height: "64px",
                borderRadius: "100px",
                border: "none",
                background: isValid ? GREEN : "#b8c5bb",
                cursor: isValid ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.25s ease",
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: "'Noto Serif KR:ExtraBold', sans-serif", fontWeight: 800, fontSize: "16px", color: "white", letterSpacing: "-0.32px", lineHeight: "normal" }}>
                상담 예약하기
              </span>
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
