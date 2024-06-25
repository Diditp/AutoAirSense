import React, { useEffect, useState } from "react";
import {realtime, firestore} from "../database/firebase_database";
import { onValue, ref } from "firebase/database";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const INTERVAL_MS = 10000; // Interval waktu dalam milidetik (10 detik)
const MAX_ENTRIES = 7; // Jumlah maksimal entri pada grafik

export default function LineChartComp() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const starCountRef = ref(realtime, "dataLogger/dataSensor");

    const fetchData = () => {
      setTimeout(() => {
        onValue(starCountRef, (snapshot) => {
          const newEntry = {
            time: new Date().toLocaleTimeString(),
            coValue: snapshot.val().coValue,
          };

          setChartData((prevData) => {
            const updatedData = [...prevData, newEntry].slice(-MAX_ENTRIES);
            return updatedData;
          });
        });
      }, 10000);
    };

    // Panggil fetchData setelah komponen dimuat
    fetchData();

    // Setel interval untuk mendapatkan data setiap INTERVAL_MS milidetik
    const intervalId = setInterval(fetchData, INTERVAL_MS);

    // Bersihkan interval saat komponen dibongkar
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Dependensi kosong agar useEffect hanya dijalankan saat komponen dimuat

  const formatXAxis = (tickItem) => {
    const hours = parseInt(tickItem.slice(0, 2));
    const minutes = parseInt(tickItem.slice(3, 5));
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  };

  return (
    <div>
      <h2>Real-time CO Value Chart</h2>
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatXAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="coValue" stroke="#82ca1d" />
      </LineChart>
    </div>
  );
}
