import type { QuestionCreateDto } from "../store/interfaces/questionInterfaces.ts";
import axios from "../utils/configAxios.ts";

const CreateQuestion = async (data: QuestionCreateDto) => {
    return (await axios.post("/questions/", data)).data;
};

const GetAllQuestion = async () => {
    return (await axios.get("/questions/")).data.questions || [];
};

const DeleteQuestion = async (id: number) => {
    return (await axios.delete(`/questions/${id}`)).data;

}
const GetQuestionById = async (id: string) => {
    return (await axios.get(`/questions/${id}`)).data.questions;
};

export { CreateQuestion, GetQuestionById, DeleteQuestion, GetAllQuestion };