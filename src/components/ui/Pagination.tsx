"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paginationRef.current) {
      gsap.fromTo(
        paginationRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  // Animate page button hover
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      backgroundColor: "#f3f4f6", // Very light gray
      color: "#4b5563", // Medium gray
      duration: 0.2,
    });
  };

  const handleButtonLeave = (
    e: React.MouseEvent<HTMLButtonElement>,
    isActive: boolean
  ) => {
    gsap.to(e.currentTarget, {
      backgroundColor: isActive ? "#e5e7eb" : "#f9fafb", // Light gray for active, very light gray for inactive
      color: isActive ? "#4b5563" : "#6b7280", // Medium gray for active, gray for inactive
      duration: 0.2,
    });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first and last page
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div
      ref={paginationRef}
      className="flex justify-center items-center mt-8 mb-4 space-x-1"
    >
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-8 w-8 rounded-md focus:outline-none cursor-pointer ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
        onMouseEnter={currentPage !== 1 ? handleButtonHover : undefined}
        onMouseLeave={(e) => currentPage !== 1 && handleButtonLeave(e, false)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1 mx-1 text-sm text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={`h-8 w-8 rounded-md focus:outline-none transition-colors text-sm cursor-pointer ${
              page === currentPage
                ? "bg-gray-100 text-gray-700 border border-gray-200"
                : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
            onMouseEnter={handleButtonHover}
            onMouseLeave={(e) => handleButtonLeave(e, page === currentPage)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center h-8 w-8 rounded-md focus:outline-none cursor-pointer ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }`}
        onMouseEnter={
          currentPage !== totalPages ? handleButtonHover : undefined
        }
        onMouseLeave={(e) =>
          currentPage !== totalPages && handleButtonLeave(e, false)
        }
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
