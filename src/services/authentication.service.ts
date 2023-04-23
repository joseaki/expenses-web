import { IAuthenticationResponse } from 'src/interfaces/Authentication.interface';
import { IResponse } from 'src/interfaces/Response.interface';

export const verifyToken = async (token: string): Promise<IResponse<IAuthenticationResponse>> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/authentication/api/verify`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();
  return data;
};
