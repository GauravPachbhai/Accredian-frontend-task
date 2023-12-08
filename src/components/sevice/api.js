import axios from "axios";

const URL = 'http://localhost:8000';
export const authenticatelogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/Userslogin`, { data});
        // Handle successful login response
        console.log(response.data);
    } catch (error) {
        // Handle login error
        console.error('Error logging in:', error);
    }
};