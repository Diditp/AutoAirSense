import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import * as React from 'react';
import database from "../database/firebase_database";
import { onValue, ref } from 'firebase/database';
import { LineChart } from '@mui/x-charts/LineChart';
import { Grid, Paper } from '@mui/material'; // Import Grid dan Paper dari MUI

export default function Chart() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [sensorData, setSensorData] = useState({}); // Objek untuk menyimpan data dari semua sensor

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

  useEffect(() => {
    const dataSensor = ref(database, "dataLogger/dataSensor");
    onValue(dataSensor, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Memperbarui data untuk setiap sensor
        Object.keys(data).forEach(sensor => {
          const newData = {
            timestamp: Date.now(), // Gunakan waktu aktual
            value: data[sensor] || 0 // Pastikan ada nilai default jika data tidak ada
          };

          // Simpan data baru untuk setiap sensor
          setSensorData(prevData => {
            let newDataArray = [];
            if (prevData[sensor]?.length === 10) {
              // Jika sudah ada 10 data, hapus data yang paling lama dan tambahkan data baru ke awal array
              newDataArray = [newData, ...prevData[sensor].slice(0, -1)];
            } else {
              // Jika belum ada 10 data, tambahkan data baru ke awal array data
              newDataArray = [...(prevData[sensor] || []), newData];
            }
            // Kembalikan state dengan data terbaru
            return {
              ...prevData,
              [sensor]: newDataArray
            };
          });
        });
      }
    });
  }, []);


  const handleWidthClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex-1 chart">
        <header className="flex justify-start header-height p-5 bg-white items-center ">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="mr-5"
              icon="bars"
              size="lg"
              onClick={handleWidthClick}
            />
            <h1 className="text-2xl md:text-4xltext-4xl">Chart</h1>
          </div>
        </header>
        <div className="px-8 py-8 min-h-screen">
          <Grid container spacing={2}> {/* Gunakan Grid dari MUI */}
            {/* Tampilkan grafik untuk data dari setiap sensor */}
            {Object.keys(sensorData).map((sensor, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={index}> {/* Atur jumlah kolom untuk setiap ukuran layar */}
                <Paper elevation={3} className="chart-item p-4"> {/* Gunakan Paper dari MUI dan tambahkan padding */}
                  <h2 className="text-xl font-bold mb-2">{sensor}</h2> {/* Gunakan ukuran font dan ketebalan dari Tailwind */}
                  <LineChart
                    xAxis={[{ data: sensorData[sensor]?.map(data => new Date(data.timestamp).getMinutes()) || [] }]}
                    series={[{ data: sensorData[sensor]?.map(data => data.value) || [] }]}
                    autoScale={true}
                    width={700}
                    height={500}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
