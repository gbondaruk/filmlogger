import type { Sql } from 'postgres';
import { z } from 'zod';

export type Film = {
  id: number | null;
  brand: string | null;
  iso: number | null;
  images: number | null;
  development: string | null;
  currentStatus: string | null;
  style: string | null;
  userId: number | null;
  cameraflId: number | null;
  lensId: number | null;
};

export const filmSchema = z.object({
  brand: z.string().min(1).max(30),
  iso: z.number().min(1).max(30),
  images: z.number().min(1).max(90),
  development: z.string().min(1).max(10),
  currentStatus: z.string().min(1).max(10),
  style: z.string().min(1).max(10),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE films (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand varchar(30) NOT NULL,
      iso integer NOT NULL,
      images integer NOT NULL,
      development varchar(30) NOT NULL,
      current_status varchar(30) NOT NULL,
      style varchar(30) NOT NULL,
      user_id integer NOT NULL REFERENCES users (id),
      camerafl_id integer NOT NULL REFERENCES camerasfl (id),
      lens_id integer NOT NULL REFERENCES lenses (id)
    )
  `;
}
export async function down(sql: Sql) {
  await sql`DROP TABLE films`;
}
