// axiosUtils.js
import axios from 'axios';

const postToServer = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data; // Handle the response data as needed
    } catch (error) {
        console.error('Error making POST request:', error);
        // Handle the error (e.g., show an error message)
    }
};

export default postToServer;
