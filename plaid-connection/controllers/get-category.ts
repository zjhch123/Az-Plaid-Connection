import { Context } from '@azure/functions';
import { getClient } from '../utils/client';

export const getCategory = async (context: Context, data: any) => {
  const response = await getClient().categoriesGet({});

  context.res = {
    body: response.data,
  };
};
