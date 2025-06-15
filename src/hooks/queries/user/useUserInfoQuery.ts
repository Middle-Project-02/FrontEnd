import { useQuery } from '@tanstack/react-query';
import type { UserInformation } from '@/types/user';
import { getUserInformation } from '@/apis/user';

const useUserInfoQuery = () => {
  const { data: userInformation } = useQuery<UserInformation>({
    queryKey: ['userInformation'],
    queryFn: getUserInformation,
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return { userInformation };
};

export default useUserInfoQuery;
