import { useEffect } from "react";
import {
  Chart,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
} from "chart.js";
import axios from "axios";

Chart.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement
);

export default function CardLineChart() {

  const getChartData = async () => {
    const data = await axios.get("https://esprit-compass-backend.vercel.app/admin/chartData");
     var config = {
       type: "line",
       data: {
         labels: [
           "January",
           "February",
           "March",
           "April",
           "May",
           "June",
           "July",
         ],
         datasets: [
           {
             label: "Companies",
             backgroundColor: "#4c51bf",
             borderColor: "#4c51bf",
             data: data.data.companies,
             fill: false,
           },
           {
             label: "Students",
             fill: false,
             backgroundColor: "#fff",
             borderColor: "#fff",
             data: data.data.students,
           },
         ],
       },
       options: {
         maintainAspectRatio: false,
         responsive: true,
         title: {
           display: false,
           text: "Sales Charts",
           fontColor: "white",
         },
         legend: {
           labels: {
             fontColor: "white",
           },
           align: "end",
           position: "bottom",
         },
         tooltips: {
           mode: "index",
           intersect: false,
         },
         hover: {
           mode: "nearest",
           intersect: true,
         },
         scales: {
           xAxes: [
             {
               ticks: {
                 fontColor: "rgba(255,255,255,.7)",
               },
               display: true,
               gridLines: {
                 display: false,
                 drawBorder: false,
                 color: "rgba(255,255,255,0.1)",
                 zeroLineColor: "transparent",
               },
               scaleLabel: {
                 display: false,
                 labelString: "Month",
                 fontColor: "white",
               },
             },
           ],
           yAxes: [
             {
               ticks: {
                 fontColor: "rgba(255,255,255,.7)",
               },
               display: true,
               scaleLabel: {
                 display: false,
                 labelString: "Value",
                 fontColor: "white",
               },
               gridLines: {
                 borderDash: [3],
                 borderDashOffset: [3],
                 drawBorder: false,
                 color: "rgba(255, 255, 255, 0.15)",
                 zeroLineColor: "rgba(33, 37, 41, 0)",
                 zeroLineBorderDash: [2],
                 zeroLineBorderDashOffset: [2],
               },
             },
           ],
         },
       },
     };
     var ctx = document.getElementById("line-chart").getContext("2d");
     window.myLine = new Chart(ctx, config);
    
  };
  
  
  useEffect(() => {
   getChartData()
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Companies to Students ratio</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
