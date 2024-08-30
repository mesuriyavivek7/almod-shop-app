import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_BASE_URL;


const ApiService = async (method, url, payload = null) => {

    try {

        const config = {
            method: method,
            url: baseUrl + url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: payload,
        }

        const res = await axios(config);
        return res;

    } catch (e) {
        throw new Error(e);
    }
}

export default ApiService;