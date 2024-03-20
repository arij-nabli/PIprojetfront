import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {

  const [cardsData, SetCardsData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/admin/allusers");
    SetCardsData(response.data);
  };
 useEffect(() => {
   fetchData();
 }, []);
  return (
    <>
      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>
      {/* Header */}
      <div className="  mb-10 ">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 transform transition duration-500 hover:scale-110">
                <CardStats
                  statSubtitle="TRAFFIC"
                  statTitle={cardsData.length}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 transform transition duration-500 hover:scale-110">
                <CardStats
                  statSubtitle="NEW USERS"
                  statTitle={
                    cardsData.filter(
                      (user) =>
                        new Date(user.createdAt) >=
                        new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                  statArrow="up"
                  statPercent={
                    cardsData.filter(
                      (user) =>
                        new Date(user.createdAt) >=
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                  statPercentColor="text-green-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 transform transition duration-500 hover:scale-110">
                <CardStats
                  statSubtitle="COMPANIES"
                  statTitle={
                    cardsData.filter((user) => user.role === "company").length
                  }
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 transform transition duration-500 hover:scale-110">
                <CardStats
                  statSubtitle="STUDENTS"
                  statTitle={
                    cardsData.filter((user) => user.role === "student").length
                  }
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
