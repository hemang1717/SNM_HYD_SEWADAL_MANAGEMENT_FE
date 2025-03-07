import React from "react";
import missionLogo from "../images/missionLogo.jpg";
import {
  Calendar,
  Home,
  UsersRound,
  LibraryBig,
  LogOutIcon,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
const items = [
  {
    title: "Attendance",
    url: "#",
    icon: Home,
  },

  {
    title: "Groups",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "Reports",
    url: "#",
    icon: LibraryBig,
  },
  {
    title: "Events",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Log Out",
    url: "#",
    icon: LogOutIcon,
  },
];

const SideBars = () => {
  const [selectedItem, setSelectedItem] = React.useState(0);
  const { setIsSignIn } = useAuth();
  const navigate = useNavigate();
  const handleSideBarOptionChanges = (item: any) => {
    console.log("item", item);
    const title=item.title;
    if (title == "Log Out") {
      setIsSignIn(false);
      localStorage.clear();
      navigate("/");
    }
    else if(title=="Attendance"){
      navigate('attendanceSheet');
    }
    else if(title=="Groups"){
      navigate('groups');
    }
    else if(title=="Reports"){
      navigate('reports');
    }
    else if(title=="Events"){
      navigate('events');
    }
  };
  return (
    <div className="h-dvh w-[20%] bg-[#5b7cfd] fixed top-0 left-0">
      <div className="flex justify-center m-2 px-2">
        <img
          src={missionLogo}
          alt="logo"
          className="h-20 w-20 mt-5 mr-3 rounded-full"
        />
        <h2 className="text-2xl mt-5 px-2 text-[#f7f8fe] font-semibold font-serif">
          SNSD HYD <br />
          Management
        </h2>
      </div>
      <div className="mt-10">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="my-2 p-2"
            onClick={() => handleSideBarOptionChanges(item)}
          >
            <div
              className={`flex p-6  items-center text-[#f7f8fe] h-12 rounded-full transition-all cursor-pointer
              ${
                selectedItem === index ? "bg-[#5374f0]" : "hover:bg-[#5374f0]"
              }`}
              onClick={() => {
                setSelectedItem(index);
              }}
            >
              <item.icon className="mr-4" />
              <span className="text-xl">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBars;
