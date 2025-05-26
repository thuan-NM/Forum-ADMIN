import type { AnswerResponse } from "../store/interfaces/answerInterfaces.ts";
import axios from "../utils/configAxios.ts"

const GetAnswer = async (id: string): Promise<AnswerResponse> => {
    if (!id) throw new Error("Answer ID is required");
    const response = await axios.get(`/answers/${id}`, { withCredentials: true });
    if (!response.data?.answer) throw new Error("Answer not found");
    return response.data.answer;
};

const DeleteAnswer = async (id: string) => {
    return (await axios.delete(`/answers/${id}`, { withCredentials: true })).data
}
const ListAnswers = async (question_id: string) => {
    try {
        return (await axios.get(`/answers/questions?question_id=${question_id}`, { withCredentials: true })).data.answers || [];
    } catch (error) {
        throw new Error("Failed to fetch answers");
    }
};
const GetAllAnswers = async (filters: any) => {
    const response = await axios.get('/answers/', { params: filters });
    return response.data;
};

const UpdateAnswerStatus = async (id: string, status: string) => {
    const response = await axios.put(`/answers/${id}/status`, { status });
    return response.data;
};

const AcceptAnswer = async (id: string) => {
    const response = await axios.put(`/answers/${id}/accept`);
    return response.data;
};
export { GetAnswer, DeleteAnswer, ListAnswers, GetAllAnswers, UpdateAnswerStatus, AcceptAnswer }