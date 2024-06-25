import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { firestore } from '../database/firebase_database'; // Sesuaikan dengan path struktur proyek Anda
import { collection, getDocs } from 'firebase/firestore';

export default function Log() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sensorData, setSensorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;
  const maxPagesPerGroup = 20;

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

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const dataSensorSnapshot = await getDocs(collection(firestore, 'dataSensor'));
        const sensorDataMap = new Map(); // Gunakan Map untuk mengelompokkan data berdasarkan waktu unik

        dataSensorSnapshot.forEach(doc => {
          const data = doc.data();
          const waktuSekarang = data.waktuSekarang.toDate().toLocaleString();
          if (!sensorDataMap.has(waktuSekarang)) {
            sensorDataMap.set(waktuSekarang, {
              id: doc.id,
              ...data,
              waktuSekarang: waktuSekarang
            });
          }
        });

        // Convert Map values ke array dan urutkan berdasarkan waktuSekarang secara descending
        const sortedSensorData = [...sensorDataMap.values()].sort((a, b) => new Date(b.waktuSekarang) - new Date(a.waktuSekarang));

        setSensorData(sortedSensorData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchDataFromFirestore();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sensorData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sensorData.length / itemsPerPage);
  const currentGroup = Math.ceil(currentPage / maxPagesPerGroup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex-1 chart">
        <header className="flex justify-start header-height p-5 bg-white items-center">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="mr-5"
              icon="bars"
              size="lg"
              onClick={handleWidthClick}
            />
            <h1 className="text-2xl md:text-4xl">Table Data</h1>
          </div>
        </header>
        <div className="px-8 py-8 flex justify-center flex-col items-center min-h-screen">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sensor Data Logger ({sensorData.length} item)</h1>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="animate-pulse">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex justify-between border-b py-2">
                      <div className="h-4 bg-gray-300 rounded w-1/12"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/12"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/12"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/12"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/12"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/12"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">No</th>
                      <th className="py-2 px-4 border-b text-left">Timestamp</th>
                      <th className="py-2 px-4 border-b text-left">CO Value (PPM)</th>
                      <th className="py-2 px-4 border-b text-left">CO2 Value (PPM)</th>
                      <th className="py-2 px-4 border-b text-left">PM Value (µg/m³)</th>
                      <th className="py-2 px-4 border-b text-left">Temperature (°C)</th>
                      <th className="py-2 px-4 border-b text-left">Humidity (%)</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((data, index) => (
                      <tr key={data.id}>
                        <td className="py-2 px-4 border-b text-left">{indexOfFirstItem + index + 1}</td>
                        <td className="py-2 px-4 border-b text-left">{data.waktuSekarang}</td>
                        <td className="py-2 px-4 border-b text-left">{data.coValue}</td>
                        <td className="py-2 px-4 border-b text-left">{data.co2Value}</td>
                        <td className="py-2 px-4 border-b text-left">{data.pmValue}</td>
                        <td className="py-2 px-4 border-b text-left">{data.suhu}</td>
                        <td className="py-2 px-4 border-b text-left">{data.kelembapan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => paginate((currentGroup - 1) * maxPagesPerGroup)}
                  className={`mx-1 px-3 py-1 border rounded ${currentGroup === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white text-blue-500'}`}
                  disabled={currentGroup === 1}
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(maxPagesPerGroup, totalPages - (currentGroup - 1) * maxPagesPerGroup) }, (_, index) => (
                  <button
                    key={(currentGroup - 1) * maxPagesPerGroup + index + 1}
                    onClick={() => paginate((currentGroup - 1) * maxPagesPerGroup + index + 1)}
                    className={`mx-1 px-3 py-1 border rounded ${currentPage === (currentGroup - 1) * maxPagesPerGroup + index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                  >
                    {(currentGroup - 1) * maxPagesPerGroup + index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentGroup * maxPagesPerGroup + 1)}
                  className={`mx-1 px-3 py-1 border rounded ${currentGroup * maxPagesPerGroup >= totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white text-blue-500'}`}
                  disabled={currentGroup * maxPagesPerGroup >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
