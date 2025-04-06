import type { Sql } from 'postgres';
import { z } from 'zod';

export type Still = {
  id: number;
  location: string;
  time: Date;
  exposureTime: number;
  aperture: string;
  tag: string;
  filmId: number;
};

export const stillSchema = z.object({
  location: z.string().min(1).max(30),
  time: z.string().datetime(),
  exposureTime: z.string().min(1).max(30),
  aperture: z.string().min(1).max(10),
  tag: z.string().min(1).max(40),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE stills (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand varchar(30) NOT NULL,
      iso integer NOT NULL,
      images integer NOT NULL,
      development varchar(30) NOT NULL,
      current_status varchar(30) NOT NULL,
      film_id integer NOT NULL REFERENCES films (id)
    )
  `;
}
export async function down(sql: Sql) {
  await sql`DROP TABLE stills`;
}
