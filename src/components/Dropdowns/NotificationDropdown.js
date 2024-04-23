import React, { useEffect } from "react";
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
  const navigate = useNavigate();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    console.log("hey",props);
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement:"bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
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
    setUnseenNotificationsNumber(sortedNotifications.filter((notification) => !notification.seen).length);
    setNotifications(sortedNotifications);
  }
  const getHardSkills = async()=>{
    const response = await axios.get(`http://localhost:5000/user/getUserHardSkills/${props.userId}`);
  
    setHardSkills(response.data.hardskills);
    console.log("getting hard skills",response.data.hardskills)
  };
  useEffect(() => {
    getNotifications();
    getHardSkills();
  }, []);
  
  useEffect(() => {
   
   
    const socket = io('http://localhost:5000');
    socket.on("connect", () => {
    });

    socket.on('notification', (data) => {
      console.log(data);
      setNotifications((prevNotifications) => [...prevNotifications, data.notification]);
      setUnseenNotificationsNumber((prevNumber) => prevNumber + 1);
    });
    socket.on('newOfferSkills', (data) => {
      console.log("data from offer",data)
      console.log("hard skills from io",hardSkills);
      
      const commonSkills = hardSkills.filter(skill => {
        return Array.isArray(data.requirements) && data.requirements.includes(skill._id);
      });
 
      if (commonSkills.length > 0) {
        console.log('There are common skills:', commonSkills);
        const notification = {
          sender: data.provider,
          receiver: props.userId,
          title: 'New offer with common skills',
          text: `There is a new offer that requires skills you have: ${commonSkills.map((skill) => skill.name).join(', ')}`,
          seen: false,
          offer: data._id,
        
        }
        saveNotification(notification);
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
        setUnseenNotificationsNumber((prevNumber) => prevNumber + 1);
      } else {
        console.log('There are no common skills.');
      }
    });
  },[hardSkills]);
  const saveNotification = async (notification) => {
    await axios.post('http://localhost:5000/notifications', notification);

  }
  const clickNotification = async (notification) => {
    console.log(notification);
    const id = notification._id
    await axios.put(`http://localhost:5000/notifications/${id}`);
    navigate(`/offer-details/${notification.offer}`)
  }
  return (
    <>
      <a
        className={"text-gray-700 block  hover:text-lg" + (dropdownPopoverShow ? " text-red-600" : "text-gray-700")}
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
        {notifications.map((notification) => (
          <div
            className={`flex items-center w-full hover:bg-gray-300 hover:cursor-pointer mb-2 mr-4 p-5 ${
              !notification.seen ? "bg-gray-100" : "white"
            }`}
            onClick={() => {clickNotification(notification)}}
          >
            <img
              src="path/to/image.jpg"
              alt="Notification Image"
              className="w-10 h-10 mr-3"
            />
            <div>
              <h3 className="text-lg font-semibold ml-10">
                {notification.title}
              </h3>
              <p className="text-sm w-1/2 ml-10">{notification.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationDropdown;
