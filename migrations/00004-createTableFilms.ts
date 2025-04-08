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

  // Insert sample data
  await sql`
    INSERT INTO
      films (
        brand,
        iso,
        images,
        development,
        current_status,
        style,
        user_id,
        camerafl_id,
        lens_id
      )
    VALUES
      (
        'Kodak',
        400,
        36,
        'C-41',
        'Exposed',
        'Color',
        1,
        1,
        1
      ),
      (
        'Ilford',
        100,
        24,
        'B&W',
        'Developed',
        'Black & White',
        1,
        2,
        2
      ),
      (
        'Fujifilm',
        200,
        36,
        'C-41',
        'In Progress',
        'Color',
        1,
        3,
        3
      )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE films`;
}
