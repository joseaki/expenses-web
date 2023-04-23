import { User } from 'firebase/auth';

export interface IUseAuth {
  user?: User;
  revokeToken: () => void;
}
