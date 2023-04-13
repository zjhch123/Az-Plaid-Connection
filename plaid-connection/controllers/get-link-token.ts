import { Context } from '@azure/functions';
import { CountryCode, CreditAccountSubtype, DepositoryAccountSubtype, LinkTokenCreateRequest, Products } from 'plaid';
import { getClient } from '../utils/client';

const getConfig = (accessToken: string): LinkTokenCreateRequest => {
  const isUpdateMode = !!accessToken;

  return {
    user: {
      client_user_id: `demo-${Date.now()}`,
    },
    client_name: 'Wallet',
    country_codes: [CountryCode.Us],
    products: isUpdateMode ? undefined : [Products.Transactions],
    language: 'en',
    access_token: isUpdateMode ? accessToken : undefined,
    update: isUpdateMode ? { account_selection_enabled: true } : undefined,
    account_filters: {
      depository: {
        account_subtypes: [DepositoryAccountSubtype.Savings],
      },
      credit: {
        account_subtypes: [CreditAccountSubtype.CreditCard],
      },
    },
  };
};

export const getLinkToken = async (context: Context, data: any) => {
  const { accessToken } = data || {};

  const createTokenResponse = await getClient().linkTokenCreate(getConfig(accessToken));
  context.res = {
    body: createTokenResponse.data,
  };
};
