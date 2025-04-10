// src/hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { fetchData } from "../utils/fetchData";
import { toast } from "sonner";

export const useRegister = () => {
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetchData("/auth/register", "POST", {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Error al registrar usuario: ${response.status}`
        );
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return registerMutation;
};

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetchData("/auth/login", "POST", {
        email: userData.email,
        password: userData.password,
      });

      if (!response.ok) {
        throw new Error(`Error al iniciar sesión: ${response.status}`);
      }

      const data = await response.json();

      if (data.access_token && data.user) {
        return {
          user: data.user,
          accessToken: data.access_token,
        };
      } else {
        throw new Error("No se recibió un token válido del servidor");
      }
    },
    onSuccess: (data, _vars, context) => {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      login({ user: data.user, access_token: data.accessToken });

      toast.success("Inicio de sesión exitoso.");
      if (context?.onSuccess) {
        context.onSuccess(data);
      }
    },
    onError: (error, _vars, context) => {
      if (context?.onError) {
        context.onError(error);
      } else {
        toast.error(`Error al iniciar sesión: ${error.message}`);
      }
    },
  });

  const loginWithCallbacks = (data, callbacks) => {
    loginMutation.mutate(data, {
      onSuccess: callbacks?.onSuccess,
      onError: callbacks?.onError,
    });
  };

  return { mutate: loginWithCallbacks, ...loginMutation };
};
