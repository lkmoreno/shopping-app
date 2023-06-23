export interface User {
  id: string,
  email: string,
  password: string,
  name: string,
  avatar: string,
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
