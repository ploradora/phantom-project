"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";

export const ResultsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [submissionData, setSubmissionData] = useState({
    url: "",
    title: "",
  });

  // Extract search params safely
  const getSearchParams = () => {
    if (!searchParams) return { url: "", title: "" };
    return {
      url: searchParams.get("url") || "",
      title: searchParams.get("title") || "",
    };
  };

  useEffect(() => {
    // Get URL parameters with safe extraction
    const { url, title } = getSearchParams();
    setSubmissionData({ url, title });

    // Run animations after component mounts
    const animateContent = () => {
      // Main timeline
      const tl = gsap.timeline();

      // Initial slide up animation for the card
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );
      }

      // Checkmark animation
      if (iconRef.current) {
        tl.fromTo(
          iconRef.current,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

        // Additional pulse animation for the icon
        gsap.to(iconRef.current, {
          scale: 1.05,
          repeat: 1,
          yoyo: true,
          duration: 1,
          delay: 1,
          ease: "power1.inOut",
        });
      }

      // Animate the details card with a slight delay
      if (detailsRef.current) {
        tl.fromTo(
          detailsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );
      }

      // Animate the link with a bounce effect
      const link = contentRef.current?.querySelector(".overview-link");
      if (link) {
        tl.fromTo(
          link,
          { y: -20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        );
      }
    };

    // Run animations
    animateContent();
  }, [searchParams]);

  return (
    <div
      ref={contentRef}
      className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-white"
    >
      <div ref={cardRef} className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          {/* Header section with icon */}
          <div className="bg-blue-500 text-white px-8 py-10 text-center relative">
            <div
              ref={iconRef}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mt-1"
            >
              <svg
                className="w-10 h-10 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mt-6 mb-2">Thank You!</h1>
            <p className="text-blue-100 text-lg">
              Your submission has been received successfully
            </p>
          </div>

          {/* Submission details */}
          <div ref={detailsRef} className="px-8 py-8">
            <div className="text-center">
              <Link
                href="/overview"
                className="overview-link inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Return to Overview
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          Thank you for using our bookmark manager. We've received your
          submission.
        </p>
      </div>
    </div>
  );
};
