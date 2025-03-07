import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/sewadal";
const API_LOGIN_URL = "http://localhost:8080/api/auth";

export const fetchPaginatedRecords = async (
  start: number,
  limit: number,
  gender: string | null,
  adhikaari: string | null
) => {
  const response = await axios.get(`${API_BASE_URL}/getSewadalData`, {
    params: { start, limit, gender, adhikaari },
  });
  return response.data;
};

export const fetchTotalRecordsCount = async (
  gender: string | null,
  adhikaari: string | null
) => {
  const response = await axios.get(`${API_BASE_URL}/getSewadalDataCount`, {
    params: { gender, adhikaari },
  });
  return response.data.recordsCount;
};
export const fetchAllSewadalData = async (
  gender: string | null,
  adhikaari: string | null
) => {
  const response = await axios.get(`${API_BASE_URL}/getAllSewadalData`, {
    params: { gender, adhikaari },
  });
  return response.data;
};
export const markAttendance = async (
  snsdId: string,
  isPresent: string,
  sewaPerformed: string
) => {
  const response = await axios.post(`${API_BASE_URL}/markAttendance`, {
    params: { snsdId, sewaPerformed, isPresent },
  });
  return response.data;
};

export const markAttendanceAPI = async (
  snsdId: string,
  sewaLocation: string,
  isPresent: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/markAttendance`, {
      snsdId,
      sewaPerformed: sewaLocation,
      isPresent,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw new Error("Error marking attendance");
  }
};
export const loginApi = async (email: string, password: string) => {
  const loginData = { email, password };
  console.log(loginData)
  try {
    const response = await axios.post(`${API_LOGIN_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
    throw new Error("Error marking attendance");
  }
};
