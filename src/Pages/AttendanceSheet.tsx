import { fetchAllSewadalData } from "@/Apis/api";
import SewadalTable from "@/components/SewadalTable";
import React, { useEffect, useState } from "react";
import { sewadalData } from "@/components/Columns";
import Calendars from "../components/Calendars";
import { groups } from "@/constants";
const AttendanceSheet: React.FC = () => {
  const [data, setData] = useState<sewadalData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemSelected, setItemSelected] = useState<string>("Gents");
  const [gender, setGender] = useState<string | null>("male");
  const [isAdhikaari, setIsAdhikaari] = useState<string | null>("no");
  const [groupSelected, setGroupSelected] = useState<string>("Group 1");

  const [sewaInfo, setSewaInfo] = useState({
    snsdId: "",
    sewaLocation: "",
    isPresent: "",
  });

  // console.log('isLoading',isLoading)
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllSewadalData(gender, isAdhikaari);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setData([]);
      }
    };
    loadData();
    // console.log("rendering")
  }, [currentPage, itemSelected, sewaInfo]);

  const handleItemSelected = (e: any) => {
    console.log(e);
    console.log("element", e.target.innerHTML);
    const val = e.target.innerHTML;
    if (e.target.innerHTML == itemSelected) {
      return;
    }
    setItemSelected(() => e.target.innerHTML);
    setIsLoading(true);
    if (val === "Gents") {
      setGender(() => "male");
      setIsAdhikaari(() => "no");
    } else if (val === "Ladies") {
      setGender(() => "female");
      setIsAdhikaari(() => "no");
    } else if (val === "Adhikaaris") {
      setIsAdhikaari(() => "yes");
      setGender(() => null);
    }
  };
  return (
    <div>
      <div className="absolute left-[20%] w-[80%] p-4 flex flex-col h-dvh overflow-auto  z-20 items-center">
        <div className="h-[10%] bg-white fixed top-0 left-[20%] w-[80%] z-10 flex justify-evenly items-center shadow-sm">
          <h3 className="text-zinc-800 text-xl font-serif">
            Record Attendance
          </h3>
          <div className="my-6">
            <div className="flex border border-gray-200 rounded-full">
              {groups.map((group, id) => (
                <p
                  key={id}
                  className={` flex items-center justify-center rounded-full ${
                    groupSelected == group.name
                      ? "bg-[#5b7cfd] text-white"
                      : "bg-white text-black"
                  }  p-1 w-28 hover:cursor-pointer`}
                  onClick={() => setGroupSelected(group.name)}
                >
                  {group.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-[10%] flex justify-evenly items-center  w-[80%]  z-20">
          <div>
            <input
              type="text"
              placeholder="Search... "
              className="mx-8 w-96 bg-gray-50 border border-gray-200 h-8 px-5 "
            />
          </div>
          <div>
            <Calendars />
          </div>
        </div>
        {isLoading ? (
          <h2 className="absolute top-[30%] w-[80%] font-mono text-2xl flex justify-center items-center">
            Data is Loading....
            <br />
            Do Simran till then
          </h2>
        ) : isError ? (
          <h2 className="absolute top-[30%] w-[80%] font-mono text-2xl flex justify-center items-center">
            Failed to fetch data .........
          </h2>
        ) : (
          <div className="absolute top-[20%] w-[80%] z-0">
            <SewadalTable
              data={data}
              sewaInfo={sewaInfo}
              setSewaInfo={setSewaInfo}
              itemSelected={itemSelected}
              handleItemSelected={handleItemSelected}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceSheet;

// const [totalPages, setTotalPages] = useState<number>(0);
// const indexOfLastPost = currentPage * POSTS_PER_PAGE;

// useEffect(() => {
//   const loadTotalCount = async () => {
//     setCurrentPage(1);
//     const totalRecords = await fetchTotalRecordsCount(gender, isAdhikaari);
//     setTotalPages(Math.ceil(totalRecords / POSTS_PER_PAGE));
//   };
//   loadTotalCount();
// }, [itemSelected]);

// useEffect(() => {
//   const loadData = async () => {
//     const data = await fetchPaginatedRecords(
//       (currentPage - 1) * POSTS_PER_PAGE,
//       POSTS_PER_PAGE,
//       gender,
//       isAdhikaari
//     );
//     setData(data);
//   };
//   loadData();
// }, [currentPage,itemSelected]);
{
  /* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </Button>
              </PaginationItem>

              <PaginationItem>
                <span className="px-4">
                  {currentPage} / {totalPages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination> */
}
