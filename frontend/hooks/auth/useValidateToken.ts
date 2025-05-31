import axiosInstance from "@/services/axiosInstance";
import { User } from "@/util/types/userReturnedData";
import { useQuery } from "@tanstack/react-query";

const validateToken = async () => {
    try {
        const response = await axiosInstance.get('/user/me');
  
        if(response.status !== 200) {
            throw new Error('Token inválido');
        }
        return response.data as User;
    } 
    catch (error) {
      console.error(error);
      throw error;
    }
};

export const useValidateToken = (token: string) => {

    const query = useQuery({
        queryKey: ['validate-token'],
        queryFn: validateToken,
        enabled: !!token
    })

    return query
};

