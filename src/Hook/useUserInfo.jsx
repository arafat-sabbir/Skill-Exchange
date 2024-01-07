import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUserInfo = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const { data: userInfo = [],isLoading,isPending,refetch } = useQuery({
    queryKey: ["userInfo", user],
    queryFn: async () => {
      const res = await axios.get(`/getUserInfo/${user?.email}`);
      return res.data;
    },
  });

  return {userInfo,isLoading,isPending,refetch};
};

export default useUserInfo;
