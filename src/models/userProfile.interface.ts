export interface UserProfile {
  id?: string;
  fullName: string;
  emails?: string[];
  mobiles?: string[];
  mainEmail?: string;
  mainMobile?: string;
  gender?: string;
  [key: string]: any;
}
