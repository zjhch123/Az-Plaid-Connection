import { Context } from '@azure/functions';
import { CountryCode, Products } from 'plaid';
import { getClient } from '../utils/client';

export const getLinkToken = async (context: Context, data: any) => {
  const configs = {
    user: {
      client_user_id: `demo-${Date.now()}`,
    },
    client_name: 'Wallet',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
  };

  const createTokenResponse = await getClient().linkTokenCreate(configs);

  context.res = {
    body: createTokenResponse.data,
  };
};
