import React from "react";
import { Chart, PieController, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";

Chart.register(PieController, CategoryScale, ArcElement, Tooltip, Legend);

export default function CardPieChart() {

  const getPieChartData = async ()=>{
    const data = await axios.get(
      "http://localhost:5000/admin/application-status-count")
      let config = {
        type: "pie",
        data: {
          labels: ["Accepted", "Refused"],
          datasets: [
            {
              data: [data.data.acceptedCount, data.data.refusedCount],
              backgroundColor: [
                "#ed64a6",
                "#4c51bf",
                "#f6ad55",
                "#48bb78",
                "#9f7aea",
                "#f56565",
                "#4299e1",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Orders Chart",
            },
          },
        },
      };
    let ctx = document.getElementById("pie-chart").getContext("2d");
    window.myPie = new Chart(ctx, config);
    
  }
  React.useEffect(() => {
    getPieChartData();
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Overall Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Application Acceptance Ratio
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}