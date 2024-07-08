export interface User {
  id?: string;
  username: string;
  password?: string;
  email: string;
  fullName?: string;
  google?: any;
  [key: string]: any;
}
