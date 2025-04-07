import type { Sql } from 'postgres';
import { z } from 'zod';

export type Developer = {
  id: number;
  business_name: string;
  address: string;
  website: string;
  opening_hours: string;
  location: Location;
  services_offered: string;
  type_of_development: string;
  contact_information: string;
};

export const developersSchema = z.object({
  business_name: z.string().min(1).max(90),
  address: z.string().min(1).max(90),
  website: z.string().min(1).max(90),
  opening_hours: z.string().min(1).max(90),
  location: z.string().min(1).max(90),
  services_offered: z.string().min(1).max(90),
  type_of_development: z.string().min(1).max(90),
  contact_information: z.string().min(1).max(90),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE developers (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      business_name varchar(255),
      address varchar(255),
      website varchar(255),
      opening_hours varchar(255),
      location varchar(30) NOT NULL,
      services_offered text,
      type_of_development varchar(255),
      contact_information varchar(255)
    )
  `;
}
export async function down(sql: Sql) {
  await sql`DROP TABLE developers`;
}
