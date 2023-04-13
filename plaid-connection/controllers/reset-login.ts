import { Context } from '@azure/functions';
import { getClient } from '../utils/client';
import { SandboxItemResetLoginRequest } from 'plaid';

export const resetLogin = async (context: Context, data: any) => {
  const request: SandboxItemResetLoginRequest = {
    access_token: data.accessToken,
  };
  const response = await getClient().sandboxItemResetLogin(request);
  context.res = {
    body: response.data,
  };
};
