import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminProfile = () => {
  // Replace the following variables with actual admin profile data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const [editPhone, setEditPhone] = useState(false);
    const [phone, setPhone] = useState("Initial Phone");
    const [newPhone, setNewPhone] = useState("");
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState("");
  const [user,setUser]=useState("");
  const [processedImage, setProcessedImage] = useState(null);


  const handleEditClick = () => {
    setEditName(!editName);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNameSubmit = (event) => {
 updateUsername(user._id, newName);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "esprit-compass-backend.vercel.app/auth/getUserDataFromToken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
        setEmail(response.data.user.email);
        setName(response.data.user.username);
        setPhone(response.data.user.phone);
        getProfileImage(response.data.user._id);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  const getProfileImage = async (id) => {
    try {
      const response = await axios.get(
        `esprit-compass-backend.vercel.app/user/get-image?id=${id}`,
        { responseType: "blob" }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };
const updateUsername = async (id) => {
  try {
    // Call your backend API to update the username using Axios
    const response = await axios.put("esprit-compass-backend.vercel.app/admin/updateUsername", { newName,id});
    if (response.status === 200) {
      setName(newName); // Update the name displayed
      setEditName(false); // Exit edit mode
    } else {
      console.error("Failed to update username");
    }
  } catch (error) {
    console.error("Error updating username:", error);
  }
};

 const handleEditPhoneClick = () => {
   setNewPhone(phone); // Reset newPhone to current phone
   setEditPhone(!editPhone); // Toggle editPhone state
 };

 const handlePhoneChange = (event) => {
   setNewPhone(event.target.value);
 };

 const handlePhoneSubmit = async () => {
   editPhoneNumber(user._id, newPhone);
   setEditPhone(!editPhone);
   setPhone(newPhone) // Toggle editPhone state
 };

 const editPhoneNumber = async (id, newPhone) => {
  try {
    // Call your backend API to update the username using Axios
    const response = await axios.put(
      "esprit-compass-backend.vercel.app/admin/updatePhoneNumber",
      { newPhone, id }
    );
    if (response.status === 200) {
      setPhone(newPhone); // Update the name displayed
    } else {
      console.error("Failed to update phone");
    }
  } catch (error) {
    console.error("Error updating phone:", error);
  }
 }
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
                  {editName ? (
                    <span className="text-blueGray-500 text-lg pl-1">
                      <input
                        type="text"
                        defaultValue={name}
                        onChange={handleNameChange}
                        onBlur={handleNameSubmit}
                        className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none transition-colors duration-200"
                        autoFocus
                      />
                      <button onClick={handleNameSubmit}>
                        <i className="fas fa-check"></i>
                      </button>
                    </span>
                  ) : (
                    <>
                      <span>{name}</span>
                      <span className="text-blueGray-500 text-lg pl-1">
                        <button onClick={handleEditClick}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </span>
                    </>
                  )}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-medium">
                  {email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-medium">
                  {editPhone ? (
                    <span className="text-blueGray-500 text-lg pl-1">
                      <input
                        type="text"
                        defaultValue={phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneSubmit}
                        className="border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none transition-colors duration-200"
                        autoFocus
                      />
                      <button onClick={handlePhoneSubmit}>
                        <i className="fas fa-check"></i>
                      </button>
                    </span>
                  ) : (
                    <>
                      <span>{phone}</span>
                      <span className="text-blueGray-500 text-lg pl-1">
                        <button onClick={handleEditPhoneClick}>
                          <i className="fas fa-edit"></i>
                        </button>
                      </span>
                    </>
                  )}
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
