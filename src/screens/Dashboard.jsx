import SensorCard from "../components/SensorCard";
import RoomStatusCard from "../components/RoomStatusCard";
import ToolInformation from "../components/ToolInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { realtime, firestore } from '../database/firebase_database';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onValue, ref, update } from 'firebase/database';
import { Switch } from "@mui/material";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deviceMode, setDeviceMode] = useState(0);
  const [coValue, setCoValue] = useState(0);
  const [co2Value, setCo2Value] = useState(0);
  const [pmValue, setPmValue] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [exhaustStatus, setExhaustStatus] = useState('Hidup');
  const [roomStatus, setRoomStatus] = useState('Baik');
  const [airQualityColor, setAirQualityColor] = useState('green');
  const [deviceStatus, setDeviceStatus] = useState('Online');

  function logout() {
    window.location.reload();
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const dashboard = document.querySelector(".dashboard");

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

  const writeDataToFirebase = () => {
    const dataSensor = {
      waktuSekarang: currentTime.toLocaleTimeString(),
    };
    const dataLogger = {
      exhaustStatus: exhaustStatus,
      mode: deviceMode
    }
    update(ref(realtime, 'dataLogger'), dataLogger);
    update(ref(realtime, 'dataLogger/dataSensor'), dataSensor);
  };

  writeDataToFirebase();

  useEffect(() => {
    const colorMap = {
      "Baik": "green",
      "Sedang": "yellow",
      "Buruk": "red"
    };
    setAirQualityColor(colorMap[roomStatus]);
  }, [roomStatus]);

  useEffect(() => {
    const dataSensor = ref(realtime, "dataLogger/dataSensor");
    const dataLogger = ref(realtime, "dataLogger");
    onValue(dataSensor, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCoValue(data.coValue);
        setCo2Value(data.co2Value);
        setPmValue(data.pmValue);
        setTemperature(data.suhu);
        setHumidity(data.kelembapan);
      }
      // Tambahkan data ke Firestore
      addDoc(collection(firestore, 'dataSensor'), {
        coValue: data.coValue,
        co2Value: data.co2Value,
        pmValue: data.pmValue,
        suhu: data.suhu,
        kelembapan: data.kelembapan,
        waktuSekarang: new Date()
      }).then(() => {
        console.log('Data berhasil ditambahkan ke Firestore');
      }).catch((error) => {
        console.error('Error menambahkan data ke Firestore:', error);
      });
    });
    onValue(dataLogger, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setExhaustStatus(data.exhaustStatus);
        setRoomStatus(data.roomStatus);
        setDeviceStatus(data.deviceStatus);
      }
    });
  }, []);

  const modeOnSwitch = () => {
    setDeviceMode(prevMode => (prevMode === 0 ? 1 : 0));
  };

  const sensorData = [
    {
      type: "Debu",
      icon: "dust",
      data: `${pmValue} µg/m³`,
      description: "Sensor PM2.5 - Memantau debu halus di dalam ruangan ini."
    },
    {
      type: "CO",
      icon: "wind",
      data: `${coValue} PPM`,
      description: "Sensor MQ-7 - Mengukur kadar gas CO di dalam ruangan ini."
    },
    {
      type: "CO2",
      icon: "wind",
      data: `${co2Value} PPM`,
      description: "Sensor MQ-7 - Mengukur kadar gas CO2 di dalam ruangan ini."
    },
    {
      type: "Suhu",
      icon: "temperature",
      data: `${temperature} Celcius`,
      description: "Sensor Dht22 - Mengukur suhu di dalam ruangan ini."
    },
    {
      type: "Kelembapan",
      icon: "humidity",
      data: `${humidity} %`,
      description: "Sensor Dht22 - Mengukur kelembapan di dalam ruangan ini."
    }
  ];

  const roomStatusData = [
    {
      status: "Baik (0 - 50)",
      imgSrc: "udaraBaik.jpg",
      desc: "Indeks Standar Pencemar Udara (ISPU) adalah suatu metode yang digunakan untuk mengukur kualitas udara dengan memperhitungkan beberapa parameter pencemar udara. Rentang 0-50 pada ISPU menunjukkan kualitas udara yang baik atau bersih di dalam ruangan. Pada rentang ini, konsentrasi pencemar udara berada pada tingkat yang rendah dan tidak memberikan dampak signifikan terhadap kesehatan manusia.",
      style: "active"
    },
    {
      status: "Sedang (50 - 100)",
      imgSrc: "udaraBaik.jpg",
      desc: "Rentang ISPU antara 50 hingga 100 mengindikasikan bahwa kualitas udara di dalam ruangan berada dalam kategori sedang. Pada rentang ini, konsentrasi beberapa parameter pencemar udara mungkin sudah mulai meningkat, tetapi masih dalam batas yang dapat ditoleransi tanpa memberikan dampak kesehatan yang signifikan pada kebanyakan individu.",
      style: "active"
    },
    {
      status: "Tidak Sehat (100 - 150)",
      imgSrc: "udaraBaik.jpg",
      desc: "Rentang 100-150 pada ISPU menunjukkan bahwa kualitas udara dalam ruangan berada pada tingkat sedang hingga agak buruk. Pada rentang ini, konsentrasi pencemar udara mungkin mencapai tingkat yang dapat menimbulkan risiko bagi kelompok sensitif atau individu dengan masalah kesehatan tertentu. Langkah-langkah pencegahan dan perhatian ekstra diperlukan untuk menjaga kesehatan penghuni ruangan.",
      style: "active"
    }
  ];

  const roomStatusCards = roomStatusData.map((status, index) => (
    <RoomStatusCard
      key={index}
      status={status.status}
      imgSrc={status.imgSrc}
      desc={status.desc}
      style={status.style}
    />
  ));

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
          <div color="black" onClick={logout} className="text-center flex items-center cursor-pointer">
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
              <div className="flex items-center justify-between">
                <h2 className="text-left text-lg font-semibold ">
                  SENSOR MONITORING (<span className="font-medium">{deviceStatus}</span>)
                </h2>
                <h2 className="text-left text-lg font-medium">hh/mm/ss: {currentTime.toLocaleTimeString()}</h2>
                <div className=" flex items-center">
                  <h3 className="font-bold">Mode <span className="font-medium">({deviceMode === 0 ? 'Manual' : 'Auto'})</span></h3>
                  <Switch onChange={modeOnSwitch} />
                </div>
              </div>
              <div className="flex justify-center gap-5 md:justify-around flex-wrap">
                {sensorData.map((data, index) => (
                  <SensorCard
                    key={index}
                    type={data.type}
                    icon={data.icon}
                    data={data.data}
                    description={data.description}
                  />
                ))}
              </div>
            </div>
            <hr className="my-5 border-t-4 border-gray-200 mx-4" />
            <div className=" ml-4">
              <h2 className="text-left text-lg font-semibold ">
                ROOM STATUS INFORMATION
              </h2>
              <div className="flex items-center justify-center">
                <div className="flex-col">
                  <div className="status-indicator" style={{ backgroundColor: airQualityColor }} ></div>
                  <h2 className="text-center mt-4 font-medium text-2xl">{roomStatus.toUpperCase()}</h2>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center lg:flex-row lg:items-stretch">
                {roomStatusCards}
              </div>
            </div>
            <hr className="my-5 border-t-4 border-gray-200 mx-4" />
            <div className="ml-4">
              <h2 className="text-left text-lg font-semibold ">
                TOOL INFORMATION
              </h2>
              <div className="flex flex-col justify-center items-center lg:flex-row lg:items-stretch">
                <ToolInformation
                  name="Exhaust Fan"
                  imgSrc="udaraBaik.jpg"
                  imgAlt="Exhaust"
                  description="Ini adalah alat pemurnian udara yang bertugas untuk menyedot udara kotor"
                  mode={deviceMode}
                />
                <ToolInformation
                  name="Carbon Filter"
                  imgAlt="Carbon Filter"
                  imgSrc="udaraBaik.jpg"
                  description="Karbon aktif dapat menyerap bau dari udara atau air, sehingga cocok digunakan di toilet, tempat sampah, dan tempat-tempat yang memancarkan bau tidak sedap."
                />
                <ToolInformation
                  name="Hepa Filter"
                  imgSrc="udaraBaik.jpg"
                  imgAlt="Exhaust"
                  description="Jenis filter udara mekanis yang bekerja dengan memaksa udara melalui jaring halus yang menjebak partikel berbahaya seperti serbuk sari, bulu hewan peliharaan, tungau debu, dan asap tembakau."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
