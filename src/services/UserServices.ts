import axios from "../utils/configAxios.ts";

const GetUserById = async (id: string) =>{
    return (await axios.get(`/users/${id}`)).data.user
}

export  { GetUserById } ;