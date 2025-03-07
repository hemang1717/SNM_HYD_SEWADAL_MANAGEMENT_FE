import { sewadalData } from "./Columns";
import { Checkbox } from "./ui/checkbox";
import { Save, Trash } from "lucide-react";
import { toast } from "sonner";
import { markAttendanceAPI } from "@/Apis/api"; // Import the API call
import {
  tableHeaders,
  attendanceHeaders,
  sewaNames,
  memberType,
} from "../constants/index";
import { useState } from "react";

interface sewadalTableProps {
  data: sewadalData[];
  sewaInfo: SewaInfo;
  setSewaInfo: any;
  itemSelected:string,
  handleItemSelected:any;
}

interface SewaInfo {
  snsdId: string;
  sewaLocation: string;
  isPresent: string;
}

const SewadalTable: React.FC<sewadalTableProps> = ({
  data,
  sewaInfo,
  setSewaInfo,
  itemSelected,
  handleItemSelected
}) => {
  

  const handleSewaInfoChange = async (
    snsdId: string,
    sewaLocation: string,
    isPresent: string
  ) => {
    try {
      const response = await markAttendanceAPI(snsdId, sewaLocation, isPresent);
      toast.success("Attendance marked successfully!");
      setSewaInfo({
        snsdId: "",
        sewaLocation: "",
        isPresent: "",
      });
    } catch (error) {
      toast.error("Error marking attendance.");
    }
  };

  return (
    <div>
      <div className="flex bg-white -mb-4 mt-4 h-9  justify-start items-center">
        {memberType.map((type,id) => (
          <p key={id} className={` flex items-center justify-center ${itemSelected==type.name?"bg-[#5b7cfd] text-white rounded-tr-2xl rounded-tl-2xl":"bg-gray-100 text-black"}  p-1 w-28 hover:cursor-pointer`} onClick={(e)=>handleItemSelected(e)}>
            {type.name}
          </p>
        ))}
      </div>
      <div className="header flex justify-around bg-[#f5f6fa] mt-4 h-12 items-center ">
        {tableHeaders.map((item, id) => (
          <div key={id} className="flex justify-start w-28 ">
            <div className="flex items-center">
              {item?.name === "Sewadal Id" && <Checkbox className="mr-2" />}
              <label className="text-[#717377]">{item?.name}</label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        {data?.map((item, id) => (
          <div
            key={id}
            className="flex justify-around w-inherit bg-white mt-4 h-16 items-center shadow-sm hover:cursor-pointer hover:bg-[#f4f7fd]"
          >
            <div className="flex items-center justify-center">
              <Checkbox className="mr-2" />
              <p className="text-black w-32 font-semibold ">{item.snsdId}</p>
            </div>

            <p className="text-black w-32">{item.name}</p>
            <p className="text-black w-32">
              {item.phoneNumber ? item.phoneNumber : "Not Present"}
            </p>

            <p
              className={`${
                item.status == "Inactive"
                  ? "bg-red-300 text-red-800"
                  : "text-green-900 bg-green-300"
              } h-8  flex justify-center items-center border rounded-full shadow-lg hover:cursor-pointer w-32 p-4`}
            >
              {item.status}
            </p>

            <div className="flex items-center justify-center">
              <select
                name="attendanceBox"
                id="attendanceBox"
                className="bg-gray-50 rounded-full h-8  px-2 w-32"
                onChange={(e) => {
                  setSewaInfo({
                    ...sewaInfo,
                    snsdId: item.snsdId,
                    isPresent: e.target.value,
                  });
                }}
                disabled={item.status === "Inactive"}
              >
                {attendanceHeaders.map((attendance, index) => (
                  <option
                    key={index}
                    value={
                      item.isPresent && index == 0
                        ? item.isPresent
                        : attendance.name
                    }
                  >
                    {item.isPresent && index == 0
                      ? item.isPresent
                      : attendance.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <select
                name="sewaBox"
                id="sewaBox"
                className="bg-gray-50 rounded-full h-8  px-2 w-32"
                onChange={(e) => {
                  setSewaInfo({
                    ...sewaInfo,
                    snsdId: item.snsdId,
                    sewaLocation: e.target.value,
                  });
                }}
                disabled={item.status === "Inactive"}
              >
                {sewaNames.map((sewa, index) => (
                  <option
                    key={index}
                    value={
                      item.isPresent && index == 0
                        ? item.sewaPerformed
                        : sewa.name
                    }
                  >
                    {item.isPresent && index == 0
                      ? item.sewaPerformed
                      : sewa.name}
                  </option>
                ))}
              </select>
              {item.status != "Inactive" ? (
                <Save
                  className="ml-1"
                  onClick={() =>
                    handleSewaInfoChange(
                      item.snsdId,
                      sewaInfo.sewaLocation,
                      sewaInfo.isPresent
                    )
                  }
                />
              ) : (
                <Trash />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SewadalTable;
