import type { Developer } from '../migrations/00006-createTableDevelopers';
import { sql } from './connect';

export const getDevelopersInsecure = async () => {
  const developers = await sql<Developer[]>`
    SELECT
      *
    FROM
      developers
  `;
  return developers;
};
