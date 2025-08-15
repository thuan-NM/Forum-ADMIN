import axios from "../utils/configAxios.ts";

const CreateGroup = async (formdata: any) => {
  return (await axios.post("/groups/", formdata, { withCredentials: true }))
    .data;
};
const GetAllGroup = async () => {
  return (
    (await axios.get("/groups/", { withCredentials: true })).data.groups || []
  );
};

export { CreateGroup, GetAllGroup };
