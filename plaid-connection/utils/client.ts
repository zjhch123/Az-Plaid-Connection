import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

let client: PlaidApi | null = null;

export const getClient = (): PlaidApi => {
  if (!client) {
    const configuration = new Configuration({
      basePath: PlaidEnvironments['sandbox'],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
          'Plaid-Version': '2020-09-14',
        },
      },
    });
    client = new PlaidApi(configuration);
  }

  return client;
};
