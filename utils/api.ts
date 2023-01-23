import { ICar, IEngine, ICreateCar, IUpdateCar, IWinner } from '../interfaces';

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

export const switchToDriveApi = async (carId: number): Promise<number> => {
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

export const deleteCarApi = async (
  carId: number,
  point: string,
): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/${point}/${carId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error(String(err));
  }
};

export const getCarApi = async (carId: number): Promise<ICar | null> => {
  try {
    const response = await fetch(`${BASE_URL}/garage/${carId}`);
    const data: ICar = await response.json();

    if (response.status === 200) {
      return data;
    }

    return null;
  } catch (err) {
    throw new Error(String(err));
  }
};

export const getWinnerApi = async (
  winnerId: number,
): Promise<{ status: number; result: IWinner }> => {
  try {
    const response = await fetch(`${BASE_URL}/winners/${winnerId}`);
    const data: IWinner = await response.json();

    return {
      status: response.status,
      result: data,
    };
  } catch (err) {
    throw new Error(String(err));
  }
};

export const setWinnerApi = async (
  carData: IWinner,
  methods: string,
): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/winners/${carData.id}`, {
      method: methods,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
  } catch (err) {
    throw new Error(String(err));
  }
};
