import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { getAccounts } from 'src/services/account.service';

const useAccount = () => {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ['accounts', user?.uid],
    queryFn: () => getAccounts(user!.uid),
    enabled: !!user?.uid,
  });
  return {
    accounts: data?.data ?? [],
  };
};

export default useAccount;
