import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getLinkToken } from './controllers/get-link-token';
import { getAccounts } from './controllers/get-accounts';
import { getTransactions } from './controllers/get-transactions';
import { getAccessToken } from './controllers/get-access-token';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { route } = req.body;

  console.log(route);

  switch (route) {
    case 'getLinkToken':
      return await getLinkToken(context, req.body.data);
    case 'getAccessToken':
      return await getAccessToken(context, req.body.data);
    case 'getAccounts':
      return getAccounts(context, req.body.data);
    case 'getTransactions':
      return getTransactions(context, req.body.data);
  }
};

export default httpTrigger;