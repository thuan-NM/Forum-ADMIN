import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Login } from "../../services/AuthServices";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho phản hồi của Login
interface LoginResponse {
  message: string;
  token: string;
  user: any; // Thay bằng kiểu dữ liệu cụ thể của user nếu có
}

// Định nghĩa kiểu dữ liệu cho credentials
interface LoginCredentials {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: Login,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      if (data && data?.user?.role === "user") {
        toast("Bạn không có quyền truy cập", {
          icon: "🚫",
        });
        return;
      }
      toast.success("Đăng nhập thành công");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch(loginSuccess({ token: data.token }));
      dispatch(setUser(data.user));
      navigate("/");
    },
    onError: (error: any) => {
      let message = "Login failed";
      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      toast.error(message);
      dispatch(loginFailure(message));
    },
  });

  return {
    ...loginMutation,
  };
};
