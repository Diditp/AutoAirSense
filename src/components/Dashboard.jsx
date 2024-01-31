import SensorCard from "./SensorCard";
import RoomStatusCard from "./RoomStatusCard";
import ToolInformation from "./ToolInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
      const sidebar = document.querySelector('.sidebar');
      const dashboard = document.querySelector('.dashboard');

      // Check if elements are found before trying to modify them
      if (sidebar && dashboard) {
          sidebar.style.width = isExpanded ? '0%' : '15%';
          sidebar.style.display = isExpanded ? 'none' : 'block';
          dashboard.style.width = isExpanded ? '100%' : '85%';
      } else {
          console.error("Elements not found.");
      }
  }, [isExpanded]);

  const handleWidthClick = () => {
      setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex-1 dashboard">
        <header className="flex justify-between header-height p-5 bg-white items-center ">
          <div className="flex items-center">
              <FontAwesomeIcon className="mr-5" icon="bars" size="lg" onClick={handleWidthClick}/>
              <h1 className="text-2xl md:text-4xl">Dashboard</h1>
          </div>
          <div className="text-center flex items-center">
          <span className="mr-2 none sm:block">Logout</span>
            <FontAwesomeIcon icon="right-from-bracket" size="xl" />
          </div>
        </header>
        <div className="px-8 py-8">
          <h1 className="mb-4 text-lg text-gray-600 font-normal md:text-2xl ">
            Hai Admin, Selamat Datang!!!
            <br />
            Tetap Jaga Kesehatan...
          </h1>
          <div className="p-4 bg-white box-shadow">
            <div className="mx-4 my-4">
              <h2 className="text-left text-lg font-semibold ">
                SENSOR MONITORING
              </h2>
              <div className="flex justify-center gap-5 md:justify-around flex-wrap">
                <SensorCard
                  type="Debu"
                  sensorType="dust"
                  data="45 ng/m3"
                  description="Sensor PM2.5 - Memantau debu halus didalam ruangan ini."
                />
                <SensorCard
                  type="CO"
                  sensorType="wind"
                  data="55 ppm"
                  description="Sensor MQ-7 - Mengukur kadar gar CO didalam ruangan ini."
                />
                <SensorCard
                  type="VOC"
                  sensorType="wind"
                  data="55 ppm"
                  description="Sensor MQ-135 - Mengukur kadar senyawa organik volatil dan CO2 didalam ruangan ini."
                />
                <SensorCard
                  type="Suhu"
                  sensorType="temperature"
                  data="15 Celsius"
                  description="Sensor Dht22 - Mengukur suhu didalam ruangan ini."
                />
                <SensorCard
                  type="Kelembapan"
                  sensorType="humidity"
                  data="15 %"
                  description="Sensor Dht22 - Mengukur kelembapan didalam ruangan ini."
                />
              </div>
            </div>
            <hr className="my-5 border-t-4 border-gray-200 mx-4" />
            <div className=" ml-4">
              <h2 className="text-left text-lg font-semibold ">
                ROOM STATUS INFORMATION
              </h2>
              <div className="flex flex-col justify-center items-center lg:flex-row lg:items-stretch">
                <RoomStatusCard
                  status="Baik (0 - 50)"
                  isActive="Active"
                  imgSrc="udaraBaik.jpg"
                  desc=" Indeks Standar Pencemar Udara (ISPU) adalah suatu metode
                  yang digunakan untuk mengukur kualitas udara dengan memperhitungkan
                  beberapa parameter pencemar udara. Rentang 0-50 pada ISPU
                  menunjukkan kualitas udara yang baik atau bersih di dalam ruangan.
                  Pada rentang ini, konsentrasi pencemar udara berada pada tingkat
                  yang rendah dan tidak memberikan dampak signifikan terhadap
                  kesehatan manusia."
                  style="active"
                />
                <RoomStatusCard
                  status="Sedang (50 - 100)"
                  isActive="Inactive"
                  imgSrc="udaraBaik.jpg"
                  desc="Rentang ISPU antara 50 hingga 100 mengindikasikan bahwa kuaFitas 
                  udara di dalam ruangan berada dalam kategori sedang. Pada rentang ini, 
                  konsentrasi beberapa parameter pencemar udara mungkin sudah mulai meningkat, 
                  tetapi masih dalam batas yang dapat ditoleransi tanpa memberikan dampak 
                  kesehatan yang signifikan pada kebanyakan individu."
                  style="inActive"
                />
                <RoomStatusCard
                  status="Tidak Sehat (100 - 150)"
                  isActive="Inactive"
                  imgSrc="udaraBaik.jpg"
                  desc="Rentang 100-50 pada ISPU menunjukkan bahwa kualitas udara dalam ruangan berada 
                  pada tingkat sedang hingga agak buruk. Pada rentang ini, konsentrasi 
                  pencemar udara mungkin mencapai tingkat yang dapat menimbulkan risiko bagi 
                  kelompok sensitif atau individu dengan masalah kesehatan tertentu. 
                  Langkah-langkah pencegahan dan perhatian ekstra diperlukan untuk menjaga 
                  kesehatan penghuni ruangan."
                  style="inActive"
                />
              </div>
            </div>
            <hr className="my-5 border-t-4 border-gray-200 mx-4" />
            <div className="ml-4">
              <h2 className="text-left text-lg font-semibold ">
                TOOL INFORMATION
              </h2>
              <div className="flex flex-col justify-center items-center lg:flex-row lg:items-stretch">
                <ToolInformation
                  name="Exhaust"
                  imgSrc="udaraBaik.jpg"
                  imgAlt="Exhaust"
                  description="Ini adalah alat pemurnian udara yang bertugas untuk menyedot udara kotor"
                />
                <ToolInformation
                  name="Carbon Filter"
                  imgAlt="Carbon Filter"
                  imgSrc="udaraBaik.jpg"
                  description="Ini adalah alat pemurnian udara yang bertugas untuk menyaring udara kotor yang di hidap exhaust"
                />
                <ToolInformation
                  name="Exhaust"
                  imgSrc="udaraBaik.jpg"
                  imgAlt="Exhaust"
                  description="Ini adalah alat pemurnian udara yang bertugas untuk menyedot udara kotor"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
