import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import RoomStatusCard from "../components/RoomStatusCard";

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

  const roomStatusData = [
    {
      status: "Baik (0 - 50)",
      imgSrc: "good-air.jpg",
      desc: "Indeks Standar Pencemar Udara (ISPU) adalah suatu metode yang digunakan untuk mengukur kualitas udara dengan memperhitungkan beberapa parameter pencemar udara. Rentang 0-50 pada ISPU menunjukkan kualitas udara yang baik atau bersih di dalam ruangan. Pada rentang ini, konsentrasi pencemar udara berada pada tingkat yang rendah dan tidak memberikan dampak signifikan terhadap kesehatan manusia.",
      style: "active"
    },
    {
      status: "Sedang (50 - 100)",
      imgSrc: "medium-air.jpg",
      desc: "Rentang ISPU antara 50 hingga 100 mengindikasikan bahwa kualitas udara di dalam ruangan berada dalam kategori sedang. Pada rentang ini, konsentrasi beberapa parameter pencemar udara mungkin sudah mulai meningkat, tetapi masih dalam batas yang dapat ditoleransi tanpa memberikan dampak kesehatan yang signifikan pada kebanyakan individu.",
      style: "active"
    },
    {
      status: "Tidak Sehat (100 - 150)",
      imgSrc: "bad-air.jpg",
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
      <div className="flex-1 about">
        <header className="flex justify-start header-height p-5 bg-white items-center ">
          <div className="flex items-center">
            <FontAwesomeIcon className="mr-5" icon="bars" size="lg" onClick={handleWidthClick} />
            <h1 className="text-2xl md:text-4xl">About</h1>
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
              <h4 className="font-semibold">Suhu dan Kelembapan</h4>
              <ul>
                <li>1. Suhu : 18 – 26 Celcius </li>
                <li>2. Kelembaban : 40% - 60%</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:items-stretch">
                {roomStatusCards}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
