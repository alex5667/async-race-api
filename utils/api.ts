import { ICar } from '../interfaces';

const BASE_URL = 'http://localhost:3000';

export const getAllCars = async (
  page = 1,
  limit = 7,
): Promise<{ cars: Array<ICar>; count: string } | null> => {
  const data = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
  const result: ICar[] = await data.json();

  if (data.status === 200) {
    return {
      cars: result,
      count: data.headers.get('X-Total-Count') || '0',
    };
  }
  return null;
};
