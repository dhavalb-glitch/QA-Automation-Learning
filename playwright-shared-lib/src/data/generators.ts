import { faker } from '@faker-js/faker';

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export function generateUserData(): UserData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
  };
}
