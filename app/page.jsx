import IntroOverlay from "./components/IntroOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import Contact from "./components/Contact";
import ContactInfo from "./components/ContactInfo";

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <Navbar />
      <div className="relative z-10 bg-black">
        <Hero />
        <About />
        <Services />
        {/* <Team /> */}
        <Contact />
        <ContactInfo />
        <div id="kapcsolat" />
      </div>
    </>
  );
}
