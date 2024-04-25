import React, { useEffect,useRef } from "react";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
const NotificationDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [notifications,setNotifications]=React.useState([]);
  const [unseenNotificationsNumber,setUnseenNotificationsNumber]=React.useState(0);
  const [hardSkills,setHardSkills]=React.useState([]);
  const [companyImages, setCompanyImages] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
 
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement:"bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const fetchCompanyImage = async (companyId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/get-image?id=${companyId}`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);

    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getNotifications = async () => {
    const response = await axios.get(`http://localhost:5000/notifications/student/${props.userId}`);
    const sortedNotifications = response.data.sort((a, b) => {
      if (a.seen === b.seen) {
        return 0;
      }
      if (a.seen) {
        return 1;
      }
      return -1;
    });
    const companyImagesPromises = response.data.map(async (notification) => {
      const image = await fetchCompanyImage(notification.sender._id);
      return { id: notification.sender._id, image };
    });
    
    const companyImagesResults = await Promise.all(companyImagesPromises);
    
    const companyImages = {};
    companyImagesResults.forEach(({ id, image }) => {
      companyImages[id] = image;
    });
  
    console.log("company images", companyImages);
    setCompanyImages(companyImages); 
    setUnseenNotificationsNumber(sortedNotifications.filter((notification) => !notification.seen).length);
    setNotifications(sortedNotifications);
    
   
  }
  const getHardSkills = async()=>{
    const response = await axios.get(`http://localhost:5000/user/getUserHardSkills/${props.userId}`).then((response) => {
      setHardSkills(response.data.hardskills);
    console.log("getting hard skills",response.data.hardskills)
    return response.data.hardskills;
    });
  
  

  };
  useEffect(() => {
    getNotifications();
    getHardSkills();
    setLoading(false);
  }, [dropdownPopoverShow]);

  
  const hardSkillsRef = useRef(hardSkills); // Create a reference to hardSkills
  useEffect(() => {
  

    hardSkillsRef.current = hardSkills; // Update the reference whenever hardSkills changes
  }, [hardSkills]);
  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    socket.disconnect()
    socket.on('notification', (data) => {
      console.log(data);
      if( data.receiver !== props.userId){
        console.log("not for me");
        return;
      };
      setNotifications((prevNotifications) => [...prevNotifications, data.notification]);
      setUnseenNotificationsNumber((prevNumber) => prevNumber + 1);
      socket.disconnect();
    });
    socket.on('newOfferSkills', (data) => {
      console.log("data from offer",data)
      
      console.log("hard skills from io",hardSkillsRef.current); // Use the reference instead of the state variable

      const commonSkills = hardSkillsRef.current.filter(skill => {
        return Array.isArray(data.requirements) && data.requirements.includes(skill._id);
      });
 
      if (commonSkills.length > 0 ) {

        console.log('There are common skills:', commonSkills);
        const notification = {
          sender: data.provider,
          receiver: props.userId,
          title: 'New offer with common skills',
          text: `There is a new offer that requires skills you have: ${commonSkills.map((skill) => skill.name).join(', ')}`,
          seen: false,
          offer: data._id,
        
        }
        notification.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        setNotifications((prevNotifications) => {
          // Check if notification with the same ID already exists
          const existingNotification = prevNotifications.find(n => n.id === notification.id);
          return existingNotification ? prevNotifications : [...prevNotifications, notification];
        });
        setUnseenNotificationsNumber((prevNumber) => prevNumber + 1);
        saveNotification(notification);
      } else {
        console.log('There are no common skills.');
      }
      socket.disconnect();
    });
    socket.on("newApplication", (data) => {
      console.log("new application",data);})
   

  
      socket.disconnect();
   
  },[]);
  const saveNotification = async (notification) => {
    await axios.post('http://localhost:5000/notifications', notification);
    console.log('Notification saved');

  }
  const clickNotification = async (notification) => {
    console.log(notification);
    const id = notification._id
    await axios.put(`http://localhost:5000/notifications/${id}`);
    console.log(props);
    if(props.role === "company")
    {
      console.log("company")
      navigate(`/company/applications/${notification.offer}`)}
    else {navigate(`/offer-details/${notification.offer}`)}
  }
  return (
    <>
      <a
        className={"text-gray-700 block  hover:text-lg" + (dropdownPopoverShow ? " text-red-6e00" : "text-gray-700")}
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-bell relative fa-xl px-2 py-6 ">
          {unseenNotificationsNumber > 0 && (
            <i className=" fa-solid fa-circle  absolute top-0 text-green-400 right-0 flex justify-center items-center " >
              <span className="absolute  text-white text-sm">
                {unseenNotificationsNumber}
              </span>
            </i>
          )}
        </i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 py-2 text-left rounded shadow-lg mt-1 overflow-y-scroll overflow-x-none max-h-96"
        }
      >
        
        { loading ?
<div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    <div class="w-full">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
    <span class="sr-only">Loading...</span>
</div>

 :  notifications.map((notification) => (
          <div
            className={`flex items-center w-full hover:bg-gray-300 hover:cursor-pointer mb-2 mr-4 p-5 ${
              !notification.seen ? "bg-gray-100" : "white"
            }`}
            onClick={() => {clickNotification(notification)}}
          >
            <img
              src={companyImages[notification.sender._id]}
              className="w-16 h-16 rounded-full"
              alt="Notification Image"
             
            />
            <div>
              <h3 className="text-lg font-semibold ml-10">
                {companyImages.length}
              </h3>
              <p className="text-sm w-1/2 ml-10">{notification.text}</p>
            </div>
          </div>
        ))
        
        
        
        }

        
      </div>
    </>
  );
};

export default NotificationDropdown;
