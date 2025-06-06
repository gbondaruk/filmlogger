import type { Sql } from 'postgres';
import { z } from 'zod';

export type Camerafl = {
  id: number | null;
  brand: string | null;
  model: string | null;
  userId: number | null;
};

export const cameraflSchema = z.object({
  brand: z.string().min(1).max(30),
  model: z.string().min(1).max(30),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE camerasfl (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand varchar(30) NOT NULL,
      model varchar(30) NOT NULL,
      user_id integer NOT NULL REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE camerasfl`;
}
