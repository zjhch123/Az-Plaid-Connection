import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getLinkToken } from './controllers/get-link-token';
import { getAccounts } from './controllers/get-accounts';
import { getTransactions } from './controllers/get-transactions';
import { getAccessToken } from './controllers/get-access-token';
import { resetLogin } from './controllers/reset-login';
import { getCategory } from './controllers/get-category';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { route } = req.body;

  console.log(route);

  try {
    switch (route) {
      case 'getLinkToken':
        return await getLinkToken(context, req.body.data);
      case 'getAccessToken':
        return await getAccessToken(context, req.body.data);
      case 'getAccounts':
        return getAccounts(context, req.body.data);
      case 'getTransactions':
        return getTransactions(context, req.body.data);
      case 'resetLogin':
        return await resetLogin(context, req.body.data);
      case 'getCategory':
        return await getCategory(context, req.body.data);
    }
  } catch (e) {
    console.error(e);
    context.res = {
      status: 500,
      body: {
        error: e?.response?.data ?? 'Error',
      },
    };
  }
};

export default httpTrigger;