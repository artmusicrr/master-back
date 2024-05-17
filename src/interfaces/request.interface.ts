import { Client } from 'pg';

export interface DataRequest {
  password: string;
  name: string;
  id_user: number;
  email: string;
  //cpf: string;
  registration_date: string;
  update_date: string;
  //active: boolean;
  db: any;
  client: Client;
  body: any;
  //newPassword: string;
}
