import { Context } from '@azure/functions';
import { subDays, format } from 'date-fns';
import { getClient } from '../utils/client';

export const getTransactions = async (context: Context, data: any) => {
  const startDate = format(subDays(new Date(), 365), 'yyyy-MM-dd');
  const endDate = format(new Date(), 'yyyy-MM-dd');

  const request = {
    access_token: data.accessToken,
    start_date: startDate,
    end_date: endDate,
    options: {
      account_ids: data.accountIds,
      count: 500,
    },
  };

  const response = await getClient().transactionsGet(request);
  context.res = {
    body: response.data,
  };
};
