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
}

export interface UpdateUserRequest extends DataRequest {
  name: string;
  email: string;
  password: string;
}
