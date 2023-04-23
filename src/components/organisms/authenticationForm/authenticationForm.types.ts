export interface IAuthentication {
  email: string;
  password: string;
}
export interface IAuthenticationForm {
  onFinish?: (data: IAuthentication) => void;
  buttonText?: string;
  loading: boolean;
}
