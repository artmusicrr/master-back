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
  fontSize: string;
  //title: string;
  subtitle: string;
  //text: string;
  image_url: string;
  order: number;
  font_family_title: string;
  font_size_title: string;
  font_weight_title: string;
  font_family_sub_title: string;
  font_size_sub_title: string;
  font_weight_sub_title: string;
  font_family_text: string;
  font_size_text: string;
  font_weight_text: string;
  color_sub_title: string;
  color_text: string;
}

export interface UpdateUserRequest extends DataRequest {
  name: string;
  email: string;
  password: string;
}
