export interface User {
  _id: string;
  fullName: string;
  email: string;
  admin: boolean;
}

export interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

export interface TrainingLog {
  _id: string;
  user: string;
  animal: string;
  title: string;
  date: string;
  description: string;
  hours: number;
}

export interface TrainingLogUser {
  _id: string;
  fullName: string;
}

export interface TrainingLogAnimal {
  _id: string;
  name: string;
  breed: string;
}

export interface TrainingLogWithDetails {
  _id: string;
  user: TrainingLogUser;
  animal: TrainingLogAnimal;
  title: string;
  date: string;
  description: string;
  hours: number;
}
