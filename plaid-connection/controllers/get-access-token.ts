import { Context } from '@azure/functions';
import { getClient } from '../utils/client';

// the 'access_token' is a private token, DO NOT pass this token to the frontend in production environment
export const getAccessToken = async (context: Context, data: any) => {
  const tokenResponse = await getClient().itemPublicTokenExchange({
    public_token: data.publicToken,
  });

  context.res = {
    body: tokenResponse.data,
  };
};
