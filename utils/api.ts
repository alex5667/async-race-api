import { ICar } from '../interfaces';

const BASE_URL = 'http://localhost:3000';

export const getAllCars = async (
  page = 1,
  limit = 7,
): Promise<{ cars: Array<ICar>; count: string } | null> => {
  // try {
  const data = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
  const res: ICar[] = await data.json();

  if (data.status === 200) {
    return {
      cars: res,
      count: data.headers.get('X-Total-Count') || '0',
    };
  }

  return null;
  // }
  //  catch (err) {
  //   throw new Error(err);
  // }
};
