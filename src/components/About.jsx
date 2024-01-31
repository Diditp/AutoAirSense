import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
      const sidebar = document.querySelector('.sidebar');
      const about = document.querySelector('.about');

      // Check if elements are found before trying to modify them
      if (sidebar && about) {
          sidebar.style.width = isExpanded ? '0%' : '15%';
          sidebar.style.display = isExpanded ? 'none' : 'block';
          about.style.width = isExpanded ? '100%' : '85%';
      } else {
          console.error("Elements not found.");
      }
  }, [isExpanded]);

  const handleWidthClick = () => {
      setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex-1 about">
        <header className="flex justify-between header-height p-5 bg-white items-center ">
          <div className="flex items-center">
              <FontAwesomeIcon className="mr-5" icon="bars" size="lg" onClick={handleWidthClick}/>
              <h1 className="text-2xl md:text-4xl">About</h1>
          </div>
          <div className="text-center flex items-center">
          <span className="mr-2 none sm:block">Logout</span>
            <FontAwesomeIcon icon="right-from-bracket" size="xl" />
          </div>
        </header>
        <div className="px-8 py-8">
          <div className="p-4 bg-white box-shadow">
            <div className="mx-4 my-4">
              <h2 className="text-left text-lg font-semibold ">
                PENJELASAN SINGKAT
              </h2>
              <h3 className="text-justify mt-2">
                Indeks Standar Pencemaran Udara (ISPU) memberikan gambaran umum
                tentang kualitas udara dengan menggabungkan beberapa parameter.
                Rentang baik, sedang, dan tinggi dapat bervariasi sesuai standar
                lokal, namun berikut adalah tambahan untuk masing-masing
                parameter:
              </h3>
              <br />
              <h4 className="font-semibold">Partikel Debu (PM10 & PM2.5)</h4>
              <ul>
                <li>1. Baik: PM2.5 `{"<"}` 25 µg/m³</li>
                <li>2. Sedang: PM2.5 25-50 µg/m³</li>
                <li>3. Tinggi: PM2.5 `{">"}` 50 µg/m³</li>
              </ul>
              <br />
              <h4 className="font-semibold">Carbon Monoksida (CO)</h4>
              <ul>
                <li>1. Baik: `{"<"}` 2 ppm</li>
                <li>2. Sedang: 2-9 ppm</li>
                <li>3. Tinggi: `{">"}` 9 ppm (standar paparan delapan jam)</li>
              </ul>
              <br />
              <h4 className="font-semibold">Carbon Dioksida (CO2)</h4>
              <ul>
                <li>1. Baik: `{"<"}` 600 ppm</li>
                <li>2. Sedang: 600-1000 ppm</li>
                <li>3. Tinggi: `{">"}` 1000 ppm</li>
              </ul>
              <br />
              <h4 className="font-semibold">Senyawa Organik Volatil (VOC)</h4>
              <ul>
                <li>1. Baik: `{"<"}` 0.3 ppm </li>
                <li>2. Sedang: 0.3-0.5 ppm</li>
                <li>3. Tinggi: `{">"}` 0.5 ppm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
