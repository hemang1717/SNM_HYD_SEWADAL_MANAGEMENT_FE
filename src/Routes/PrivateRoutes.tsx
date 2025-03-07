import { Route, Routes } from "react-router-dom";
import AttendanceSheet from "../Pages/AttendanceSheet";
import Reports from "../Pages/Reports";
import NotFound from "../Pages/NotFound";
import SideBars from "@/components/SideBar";
import Groups from "@/Pages/Groups";
import Events from "../Pages/Events";

const PrivateRoutes: React.FC = () => {
  return (
    <>
      <SideBars />

      <Routes>
        <Route path="/attendanceSheet" element={<AttendanceSheet />} />
        <Route path="/groups" element={<Groups/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default PrivateRoutes;
