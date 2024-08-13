import axios from "axios";

const axiosSecure = axios.create({
    baseURL:'https://parcel-management-server-iota.vercel.app'
})

const useAxiosSecure =()=>{
    return axiosSecure;
}

export default useAxiosSecure;