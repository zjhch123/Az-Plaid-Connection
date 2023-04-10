import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getLinkToken } from './controllers/get-link-token';
import { getAccounts } from './controllers/get-accounts';
import { getTransactions } from './controllers/get-transactions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { route } = req.body;

  console.log(route);

  switch (route) {
    case 'getLinkToken':
      await getLinkToken(context, req.body.data);
      break;
    case 'getAccounts':
      return getAccounts(context, req.body.data);
    case 'getTransactions':
      return getTransactions(context, req.body.data);
  }
};

export default httpTrigger;