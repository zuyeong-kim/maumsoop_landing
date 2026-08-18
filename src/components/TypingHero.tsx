import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* 초성 */
const CHO = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ",
  "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ",
  "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

/* 한글 한 글자를 실제 입력하는 것처럼 단계별로 만들어주는 함수 */
function makeTypingSteps(text: string) {
  const steps: string[] = [];
  let completed = "";

  for (const char of text) {
    const code = char.charCodeAt(0);

    // 한글 완성형 음절
    if (code >= 0xac00 && code <= 0xd7a3) {
      const syllableIndex = code - 0xac00;

      const choIndex = Math.floor(syllableIndex / 588);
      const jungIndex = Math.floor((syllableIndex % 588) / 28);
      const jongIndex = syllableIndex % 28;

      // 1. 초성
      steps.push(completed + CHO[choIndex]);

      // 2. 초성 + 중성
      const middleCode =
        0xac00 +
        choIndex * 588 +
        jungIndex * 28;

      steps.push(
        completed + String.fromCharCode(middleCode)
      );

      // 3. 종성이 있으면 완성형까지
      if (jongIndex !== 0) {
        steps.push(completed + char);
      }

      completed += char;
    } else {
      // 띄어쓰기 / 마침표 등
      completed += char;
      steps.push(completed);
    }
  }

  return steps;
}

export default function TypingHero() {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  useGSAP(
    () => {
      const firstLine = makeTypingSteps("마음에도");
      const secondLine = makeTypingSteps("머물 곳이 필요하니까.");

      const tl = gsap.timeline();

      /* 첫 번째 줄 */
      firstLine.forEach((text) => {
        tl.call(() => {
          setLine1(text);
        });

        tl.to({}, { duration: 0.09 });
      });

      /* 줄 사이 잠깐 쉬기 */
      tl.to({}, { duration: 0.35 });

      /* 두 번째 줄 */
      secondLine.forEach((text) => {
        tl.call(() => {
          setLine2(text);
        });

        tl.to({}, { duration: 0.09 });
      });
    },
    { scope: containerRef }
  );

  return (
    <p
      ref={containerRef}
      className="-translate-x-1/2 [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] absolute font-['Noto_Serif_KR:Medium','Batang',serif] font-medium leading-[1.4] left-1/2 text-[128px] text-center text-white top-[374px] tracking-[-2.56px] whitespace-nowrap"
    >
      {line1}
      <br />
      {line2}
    </p>
  );
}