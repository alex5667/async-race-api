import { ICar, IEngine } from '../interfaces';

const BASE_URL = 'http://localhost:3000';

export const getAllCars = async (
  page = 1,
  limit = 7,
): Promise<{ cars: Array<ICar>; count: string } | null> => {
  const response = await fetch(
    `${BASE_URL}/garage?_page=${page}&_limit=${limit}`,
  );
  const data: ICar[] = await response.json();

  if (response.status === 200) {
    return {
      cars: data,
      count: response.headers.get('X-Total-Count') || '0',
    };
  }
  return null;
};

export const startEngineCarApi = async (
  carId: number,
): Promise<{ status: number; result: IEngine }> => {
    const data = await fetch(`${BASE_URL}/engine?id=${carId}&status=started`);
    const res: IEngine = await data.json();

    return {
      status: data.status,
      result: res,
    };

};

export const switchToDriveModeApi = async (carId: number): Promise<number> => {
  const response = await fetch(`${BASE_URL}/engine?id=${carId}&status=drive`);
  return response.status;
};
