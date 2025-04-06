import type { Sql } from 'postgres';
import { z } from 'zod';

export type Camera = {
  id: number;
  brand: string;
  model: string;
  userId: number;
};

export const cameraSchema = z.object({
  brand: z.string().min(1).max(30),
  model: z.string().min(1).max(30),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE cameras (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand varchar(30) NOT NULL,
      model varchar(30) NOT NULL,
      user_id integer NOT NULL REFERENCES users (id)
    )
  `;
}
export async function down(sql: Sql) {
  await sql`DROP TABLE cameras`;
}
