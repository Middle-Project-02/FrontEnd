import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInformation, patchUpdateUserInfo, deleteUser } from '@/apis/user';
import type { UserInformation } from '@/types/user';

export const useUserInfoQuery = () => {
  const {
    data: userInformation,
    refetch,
    isLoading,
  } = useQuery<UserInformation>({
    queryKey: ['userInformation'],
    queryFn: getUserInformation,
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return { userInformation, refetch, isLoading };
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUpdateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInformation'] });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['userInformation'] });
    },
  });
};

export default useUserInfoQuery;
