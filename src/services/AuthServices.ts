import axios from "../utils/configAxios";

const Register = async (data: object) => {
  return (await axios.post("/register", data)).data;
};

const Login = async (data: object) => {
  const response = await axios.post("/login", data);
  return response.data
};

const LogoutAccount = async () => {
  const response = await axios.post("/logout")
  console.log(response.data)
  return response.data
}

export { Register, Login, LogoutAccount };