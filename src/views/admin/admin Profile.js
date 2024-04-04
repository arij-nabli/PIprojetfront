import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminProfile = () => {
  // Replace the following variables with actual admin profile data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [processedImage, setProcessedImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/getUserDataFromToken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmail(response.data.user.email);
        setName(response.data.user.username);
        setPhone(response.data.user.phone);
        getProfileImage(response.data.user._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
},[]);
const getProfileImage = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/user/get-image?id=${id}`,
      { responseType: "blob" }
    );
    const imageUrl = URL.createObjectURL(response.data);
    setProcessedImage(imageUrl);
  } catch (error) {
    console.error(error);
  }
};


   
  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://www.entreprises-magazine.com/wp-content/uploads/2020/07/Esprit-vendu-par-la-banque-Rothschild.png')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-6 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center mb-28">
                <img
                  src={processedImage}
                  alt="..."
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
                <div></div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                  {name}
                  <span className="text-blueGray-500 text-lg pl-1">
                    {" "}
                    <button>
                      <i className="fas fa-edit"></i>
                    </button>
                  </span>
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-medium">
                  {email}
                  <span className="pl-1">
                    {" "}
                    <button>
                      <i className="fas fa-edit"></i>
                    </button>
                  </span>
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-medium">
                  {phone}
                  <span className="pl-1">
                    {" "}
                    <button>
                      <i className="fas fa-edit"></i>
                    </button>
                  </span>
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Director of External Relations
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  Esprit
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      Founded in 2003 on the initiative of three academics who
                      had led numerous projects in Tunisian higher education,
                      and in technical higher education in particular,
                      surrounded by dozens of their colleagues, as well as ICT
                      companies and financial partners, Esprit has from the
                      outset set up training courses based on intangible values
                    </p>
                    <a
                      href="https://esprit.tn"
                      className="font-normal text-lightBlue-500"
                    >
                      Esprit.tn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminProfile;
