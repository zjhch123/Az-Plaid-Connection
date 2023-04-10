import { Context } from '@azure/functions';
import { getClient } from '../utils/client';

export const getAccounts = async (context: Context, data: any) => {
  const accountsResponse = await getClient().accountsGet({
    access_token: data.accessToken,
  });

  context.res = {
    body: accountsResponse.data,
  };
};
