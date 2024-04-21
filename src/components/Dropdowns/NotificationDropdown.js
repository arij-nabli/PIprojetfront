import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import axios from "axios";
import io from 'socket.io-client';

const NotificationDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [notifications,setNotifications]=React.useState([]);
  const [unseenNotificationsNumber,setUnseenNotificationsNumber]=React.useState(0);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    console.log("hey",props);
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
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
    const socket = io('http://localhost:3000');
    getNotifications();

    socket.on('notification', (newNotification) => {
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      setUnseenNotificationsNumber((prevNumber) => prevNumber + 1);
    });
  
    return () => socket.disconnect();
  }, []);
  return (
    <>
      <a
        className="text-black block py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-bell black "></i>
        {unseenNotificationsNumber}
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2  list-none text-left rounded shadow-lg mt-1 min-w-48"
        }
      >
        
        {notifications.map((notification) => {
          return (
            <div className={`flex items-center hover:bg-gray-300 mb-2 mr-4 p-5 ${!notification.seen ? 'bg-gray-100' : 'white'}`}>
              <img
                src="path/to/image.jpg"
                alt="Notification Image"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-sm w-1/2">{notification.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NotificationDropdown;
