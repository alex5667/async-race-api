import { ICar, IEngine } from '../interfaces';

const BASE_URL = 'http://localhost:3000';

export const getAllCarsApi = async (
  page = 1,
  limit = 7,
): Promise<{ cars: Array<ICar>; count: string } | null> => {
  try {
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
  } catch (err) {
    throw new Error(String(err));
  }
};

export const startEngineApi = async (
  carId: number,
): Promise<{ status: number; result: IEngine }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/engine?id=${carId}&status=started`,
    );
    const data: IEngine = await response.json();

    return {
      status: response.status,
      result: data,
    };
  } catch (err) {
    throw new Error(String(err));
  }
};

export const switchToDriveModeApi = async (carId: number): Promise<number> => {
  const response = await fetch(`${BASE_URL}/engine?id=${carId}&status=drive`);
  return response.status;
};

export const stopEngineApi = async (
  carId: number,
): Promise<{ status: number; result: IEngine }> => {
  try {
    const response = await fetch(
      `${BASE_URL}/engine?id=${carId}&status=stopped`,
    );
    const data: IEngine = await response.json();
    return {
      status: response.status,
      result: data,
    };
  } catch (err) {
    throw new Error(String(err));
  }
};
