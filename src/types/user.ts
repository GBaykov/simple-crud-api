export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};
export type RequestPutUser = {
  username?: string;
  age?: number;
  hobbies?: string[] | [];
};

export type Users = User[] | [];

export type IuserRequest = {
  id?: string;
  username?: string;
  age?: number;
  hobbies?: string[] | [];
};
