import type { Sql } from 'postgres';
import { z } from 'zod';

export type Still = {
  id: number;
  location: string;
  time: Date;
  exposureTime: string;
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
      location varchar(30) NOT NULL,
      time timestamp NOT NULL,
      exposure_time varchar(30) NOT NULL,
      aperture varchar(10) NOT NULL,
      tag varchar(40) NOT NULL,
      film_id integer NOT NULL REFERENCES films (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE stills`;
}
