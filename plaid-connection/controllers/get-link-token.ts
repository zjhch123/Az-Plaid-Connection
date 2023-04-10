import { Context } from '@azure/functions';
import { CountryCode, CreditAccountSubtype, DepositoryAccountSubtype, LinkTokenCreateRequest, Products } from 'plaid';
import { getClient } from '../utils/client';

export const getLinkToken = async (context: Context, data: any) => {
  const configs: LinkTokenCreateRequest = {
    user: {
      client_user_id: `demo-${Date.now()}`,
    },
    client_name: 'Wallet',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
    account_filters: {
      depository: {
        account_subtypes: [DepositoryAccountSubtype.Savings],
      },
      credit: {
        account_subtypes: [CreditAccountSubtype.CreditCard],
      },
    },
  };

  const createTokenResponse = await getClient().linkTokenCreate(configs);

  context.res = {
    body: createTokenResponse.data,
  };
};
