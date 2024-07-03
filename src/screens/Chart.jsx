import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { realtime } from "../database/firebase_database";
import { onValue, ref } from 'firebase/database';
import Chart from 'react-apexcharts';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function SensorCharts() {
  const [sensorData, setSensorData] = useState({});
  const [realTimeData, setRealTimeData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  useEffect(() => {
    const dataSensor = ref(realtime, "dataLogger/dataSensor");
    onValue(dataSensor, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newData = {};
        for (const [key, value] of Object.entries(data)) {
          newData[key] = {
            timeStamp: new Date(), // Gunakan waktu saat ini
            value: value,
          };
        }
        setSensorData(newData);
      }
    });
  }, []);

  useEffect(() => {
    const dataSensor = ref(realtime, "dataLogger/dataSensor");
    onValue(dataSensor, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const updatedData = { ...realTimeData };
        for (const [key, value] of Object.entries(data)) {
          const sensorData = updatedData[key] || [];

          // Determine the current timestamp in milliseconds
          let currentTimestamp = Date.now();

          // Check if the last entry has the same timestamp
          if (sensorData.length > 0 && sensorData[sensorData.length - 1].timeStamp === currentTimestamp) {
            // If the current timestamp is the same, wait for approximately 3 seconds
            await new Promise(resolve => setTimeout(resolve, 5000)); // 3000 milliseconds = 3 seconds
            currentTimestamp = Date.now(); // Update timestamp after waiting
          }

          const latestData = {
            timeStamp: currentTimestamp, // Gunakan timestamp unik
            value: value,
          };

          // Masukkan data terbaru ke dalam array sensorData
          if (sensorData.length < dataPerPage) {
            sensorData.push(latestData);
          } else {
            sensorData.shift(); // Hapus data pertama jika sudah mencapai batas dataPerPage
            sensorData.push(latestData);
          }

          updatedData[key] = sensorData;
        }
        setRealTimeData(updatedData);
      }
    });
  }, [sensorData]);

  const handleWidthClick = () => {
    // Implementasi logika untuk menoggle lebar sidebar (opsional untuk contoh ini)
  };

  const getChartOptions = (sensorName) => ({
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      }
    },
    xaxis: {
      categories: realTimeData[sensorName]?.map(data => new Date(data.timeStamp).toLocaleString()) || [],
    },
  });

  const getChartSeries = (sensorName) => ([{
    name: sensorName,
    data: realTimeData[sensorName]?.map(data => parseFloat(data.value).toFixed(0)).slice(-dataPerPage) || [],
  }]);

  // Hitung jumlah halaman
  const totalPages = Math.ceil(realTimeData[Object.keys(sensorData)[0]]?.length / dataPerPage); // Menggunakan sensorName yang valid, misalnya mengambil kunci pertama

  // Fungsi untuk mengatur halaman
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Hitung indeks awal dan akhir dari halaman saat ini
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

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
            <h1 className="text-2xl md:text-4xl">Sensor Charts</h1>
          </div>
        </header>
        <div className="px-8 py-8 min-h-screen">
          <Grid container spacing={3}>
            {Object.keys(sensorData).map((sensorName) => (
              <Grid item xs={12} key={sensorName}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold">{sensorName}</h3>
                  </div>
                  <Chart
                    options={getChartOptions(sensorName)} // Pastikan sensorName dikirimkan ke getChartOptions
                    series={getChartSeries(sensorName)} // Pastikan sensorName dikirimkan ke getChartSeries
                    type="line"
                    height={300}
                  />
                  <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {realTimeData[sensorName]?.slice(startIndex, endIndex).map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(data.timeStamp).toLocaleString()}</TableCell>
                            <TableCell>{parseFloat(data.value).toFixed(0)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* Kontrol pagination */}
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
