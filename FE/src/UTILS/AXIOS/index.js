import axios from "axios";
const BE_DOMAIN = "http://localhost:5000/api"
const BE_VERSION = "v1"
const axiosGet = async (url) => {
    try {
        const response = await axios.get(`${BE_DOMAIN}/${BE_VERSION}/${url}`,)
        return response.data.responsePayload
    } catch (error) {
        return error
    }
}

export { axiosGet }