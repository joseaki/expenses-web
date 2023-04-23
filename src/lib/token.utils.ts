import { IncomingMessage } from 'http';

export const getTokenFormRequest = (
  request: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  const token = request.cookies.token ?? '';
  const [_, content] = token.split('.');
  const decodedToken = Buffer.from(content, 'base64').toString();
  return [token, JSON.parse(decodedToken)];
};
