export interface IRoute {
  path: string;
  page: () => void;
}

export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface IEngine {
  velocity: number;
  distance: number;
}

export interface ICreateCar {
  name: string;
  color: string;
}

export interface IUpdateCar {
  id?: number;
  name: string;
  color: string;
}
