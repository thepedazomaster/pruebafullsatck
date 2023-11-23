import axios from "axios";

//baseURL: "https://nomada-e-comers.vercel.app/api",
//baseURL: "http://localhost:3000/api",

const baseURL = process.env.LOCAL_API_ULR;
console.log(baseURL, "aqui");

const myApi = axios.create({
  baseURL,
});
export default myApi;
