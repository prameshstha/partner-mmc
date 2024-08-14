import axios from "axios";

export default function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function setAuthApiKey(apiKey) {
    if (apiKey) {
        axios.defaults.headers.common["api-key"] = apiKey;
    } else {
        delete axios.defaults.headers.common["api-key"];
    }
}
