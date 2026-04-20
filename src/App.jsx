import React, { useState, useEffect } from "react";
import { tensions } from "./data/scenario.js";
import ProgressBar from "./components/ProgressBar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import ProfileSplit from "./components/ProfileSplit.jsx";
import TensionLayer from "./components/TensionLayer.jsx";
import ResolutionSection from "./components/ResolutionSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [solved, setSolved] = useState([false, false, false]);

  function handleSolve(index) {
    setSolved((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }

  // IntersectionObserver for .rv scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const revealEls = document.querySelectorAll(".rv");
    revealEls.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  // Re-run observer when solved state changes (TransformPanel becomes visible)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    // Small delay to allow DOM to update after state change
    const timer = setTimeout(() => {
      document.querySelectorAll(".rv:not(.vis)").forEach((el) => obs.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, [solved]);

  const allSolved = solved.every(Boolean);

  return (
    <>
      <ProgressBar solved={solved} />
      <main>
        <HeroSection />
        <ProfileSplit />
        {tensions.map((tension, i) => (
          <TensionLayer
            key={tension.id}
            index={i}
            data={tension}
            solved={solved[i]}
            onSolve={() => handleSolve(i)}
          />
        ))}
        <ResolutionSection allSolved={allSolved} />
      </main>
      <Footer />
    </>
  );
}
