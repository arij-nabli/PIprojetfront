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
  useEffect(() => {
    getNotifications()
    const socket = io('http://localhost:5000');
    socket.on("connect", () => {
      console.log(socket.id); 
    });
    socket.on('notification', (data) => {
      console.log(data);
      setNotifications((prevNotifications) => [...prevNotifications, data.notification]);
      setUnseenNotificationsNumber((prevNumber) => prevNumber + 1);
    });
  }, []);
  const clickNotification = async (notification) => {
    console.log(notification);
    const id = notification._id
    await axios.put(`http://localhost:5000/notifications/${id}`);
    navigate(`/offer-details/${notification.offer}`)
  }
  return (
    <>
      <a
        className="text-gray-700 block  hover:text-lg"
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
