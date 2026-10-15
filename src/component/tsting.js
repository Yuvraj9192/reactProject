import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get('https://backendusingprisma.onrender.com');
    console.log(response.data); // Data is automatically parsed to JSON
  } catch (error) {
    console.error(error);
  }
};

fetchData();