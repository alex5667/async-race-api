import { ICar, IEngine, ICreateCar, IUpdateCar } from '../interfaces';

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

export const createCarApi = async (car: ICreateCar): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (err) {
    throw new Error(String(err));
  }
};

export const updateCarApi = async (car: IUpdateCar): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/garage/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  } catch (err) {
    throw new Error(String(err));
  }
};

export const deleteCarApi = async (carId: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/garage/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(String(err));
  }
};

export const deleteWinnerApi = async (carId: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/winners/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(String(err));
  }
};

export const getCar = async (carId: number): Promise<ICar | null> => {
  try {
    const data = await fetch(`${BASE_URL}/garage/${carId}`);
    const res: ICar = await data.json();

    if (data.status === 200) {
      return res;
    }

    return null;
  } catch (err) {
    throw new Error(String(err));
  }
};
