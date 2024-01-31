import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Chart() {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const chart = document.querySelector(".chart");

    // Check if elements are found before trying to modify them
    if (sidebar && chart) {
      sidebar.style.width = isExpanded ? "0%" : "15%";
      sidebar.style.display = isExpanded ? "none" : "block";
      chart.style.width = isExpanded ? "100%" : "85%";
    } else {
      console.error("Elements not found.");
    }
  }, [isExpanded]);

  const handleWidthClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex-1 chart">
        <header className="flex justify-between header-height p-5 bg-white items-center ">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="mr-5"
              icon="bars"
              size="lg"
              onClick={handleWidthClick}
            />
            <h1 className="text-2xl md:text-4xltext-4xl">Chart</h1>
          </div>
          <div className="text-center flex items-center">
            <span className="mr-2 none sm:block">Logout</span>
            <FontAwesomeIcon icon="right-from-bracket" size="xl" />
          </div>
        </header>
        <div className="px-8 py-8 flex justify-center items-center min-h-screen">
            <h1 className="text-base sm:text-5xl text-center">UNDER CONSTRUCTION</h1>
        </div>
      </div>
    </>
  );
}
