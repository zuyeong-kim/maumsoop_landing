import Frame1 from "@/imports/Frame7/index";
import TherapistSlider from "@/components/TherapistSlider";
import AppointmentForm from "@/components/AppointmentForm";
import SiteHeader from "@/components/SiteHeader";
import HeroCTAButton from "@/components/HeroCTAButton";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import MapOverlay from "@/components/MapOverlay";

export default function App() {
  return (
    <>
      <SiteHeader />
      <div style={{ width: "1920px", minHeight: "100vh", position: "relative" }}>
        {/*
          HeroVideoBackground and BookingSectionBg are rendered BEFORE Frame1 so they
          sit below Frame1 in DOM paint order. Frame1's bg-white is overridden to
          transparent (index.css) so these backgrounds show through.
        */}
        <HeroVideoBackground />

        <Frame1 />
        <HeroCTAButton />
        <TherapistSlider />
        <AppointmentForm />
        <MapOverlay />
      </div>
    </>
  );
}
