import SensorCard from "./SensorCard";
import RoomStatusCard from "./RoomStatusCard";
import ToolInformation from "./ToolInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import database from "../database/firebase_database";
import { onValue, ref , update} from "firebase/database";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isActive, setActive] = useState('active');

  useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const dashboard = document.querySelector(".dashboard");

    // Check if elements are found before trying to modify them
    if (sidebar && dashboard) {
      sidebar.style.width = isExpanded ? "0%" : "15%";
      sidebar.style.display = isExpanded ? "none" : "block";
      dashboard.style.width = isExpanded ? "100%" : "85%";
    } else {
      console.error("Elements not found.");
    }
  }, [isExpanded]);

  const handleWidthClick = () => {
    setIsExpanded(!isExpanded);
  };

  let coValue = null;
  let co2Value = null;
  let vocValue = null;
  let pmValue = null;
  let suhu = null;
  let kelembapan = null;

  const writeDataToFirebase = () => {
    // Menggunakan metode push() untuk menambahkan data baru dengan kunci unik
      update(ref(database, 'dataLogger/dataSensor'), {
          coValue: 1,
          co2Value: 1,
          vocValue: 1,
          pmValue: 1,
          suhu: 1,
          kelembapan: 1,
          waktuSekarang: currentTime.toLocaleTimeString(),
      });
  };

  writeDataToFirebase();

  // Menggunakan metode on() untuk mendengarkan perubahan pada data di Firebase
  const starCountRef = ref(database, "dataLogger/dataSensor");
  onValue(starCountRef, (snapshot) => {
      coValue = snapshot.val().coValue;
      co2Value = snapshot.val().co2Value;
      vocValue = snapshot.val().vocValue;
      pmValue = snapshot.val().pmValue;
      suhu = snapshot.val().kelembapan;
      kelembapan = snapshot.val().kelembapan;
    });

    const [airQualityLabel, setAirQualityLabel] = useState("Buruk");

    const determineAirQuality = () => {
        console.log("Data Sensor:");
        console.log("PM Value:", pmValue, pmValue < 50);
        console.log("CO Value:", coValue, coValue < 2);
        console.log("CO2 Value:", co2Value, co2Value < 600);
        console.log("VOC Value:", vocValue, vocValue < 2);
        console.log("Suhu:", suhu, suhu >= 20 && suhu <= 25);
        console.log("Kelembapan:", kelembapan, kelembapan >= 30 && kelembapan <= 50);
      if (pmValue < 50 && coValue < 2 && co2Value < 600 && vocValue < 2 && suhu <= 25 && kelembapan <= 50) {
        setAirQualityLabel("Baik");
      } else if ((pmValue >= 50 && pmValue <= 100) || (coValue >= 2 && coValue <= 9) || (co2Value >= 600 && co2Value <= 1000) || (vocValue >= 3 && vocValue <= 6) || (suhu < 27 || suhu > 30) || (kelembapan < 30 || kelembapan > 50)) {
        setAirQualityLabel("Sedang");
      } else {
        setAirQualityLabel("Buruk");
      }
    };
    
    useEffect(() => {
      determineAirQuality();
    }, [pmValue, coValue, co2Value, vocValue, suhu, kelembapan])

  return (
    <>
      <div className="flex-1 dashboard">
        <header className="flex justify-between header-height p-5 bg-white items-center ">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="mr-5"
              icon="bars"
              size="lg"
              onClick={handleWidthClick}
            />
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
                  data={pmValue + " µg/m³"}
                  description="Sensor PM2.5 - Memantau debu halus didalam ruangan ini."
                />
                <SensorCard
                  type="CO"
                  sensorType="wind"
                  data={coValue + " PPM"}
                  description="Sensor MQ-7 - Mengukur kadar gar CO didalam ruangan ini."
                />
                <SensorCard
                  type="CO2"
                  sensorType="wind"
                  data={co2Value + " PPM"}
                  description="Sensor MQ-7 - Mengukur kadar gar CO didalam ruangan ini."
                />
                <SensorCard
                  type="VOC"
                  sensorType="wind"
                  data={vocValue + " PPM"}
                  description="Sensor MQ-135 - Mengukur kadar senyawa organik volatil dan CO2 didalam ruangan ini."
                />
                <SensorCard
                  type="Suhu"
                  sensorType="temperature"
                  data={suhu + " Celcius"}
                  description="Sensor Dht22 - Mengukur suhu didalam ruangan ini."
                />
                <SensorCard
                  type="Kelembapan"
                  sensorType="humidity"
                  data={kelembapan + " %"}
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
                  isActive={airQualityLabel}
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
