import { Client } from 'pg';

export interface DataRequest {
  password: string;
  name: string;
  id_user: number;
  email: string;
  registration_date: string;
  update_date: string;
  db: any;
  client: Client;
  body: any;
  id_text: number;
  text: string;
  title: string;
  sub_title: string;
  any_text: string;
  img: string;
  img_home: string;
  img_gallery: string;
  id_image: number;
  image_other: string;
  img_small: string;
  description: string;
  color_title: string;
  content: string;
  color: string;
  typeText: string;
}

export interface UpdateUserRequest extends DataRequest {
  name: string;
  email: string;
  password: string;
}
