import type { Session } from '../migrations/00001-createTableSessions';
import type { Lens } from '../migrations/00003-createTableLenses';
import { sql } from './connect';

export async function getLenses(sessionToken: Session['token']) {
  const lenses = await sql<Lens[]>`
    SELECT
      lenses.*
    FROM
      lenses
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = lenses.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return lenses;
}

export async function getLens(
  sessionToken: Session['token'],
  lensId: Lens['id'],
) {
  const [lens] = await sql<Lens[]>`
    SELECT
      lenses.*
    FROM
      lenses
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = lenses.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      lenses.id = ${lensId}
  `;
  return lens;
}

export async function createLens(
  sessionToken: Session['token'],
  newLens: Omit<Lens, 'id' | 'user_id'>,
) {
  const [lens] = await sql<Lens[]>`
    INSERT INTO
      lenses (user_id, brand, model) (
        SELECT
          user_id,
          ${newLens.brand},
          ${newLens.model}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND expiry_timestamp > now()
      )
    RETURNING
      lenses.*
  `;
  return lens;
}

export async function updateLens(
  sessionToken: Session['token'],
  updatedLens: Omit<Lens, 'user_id'>,
) {
  const [lens] = await sql<Lens[]>`
    UPDATE lenses
    SET
      brand = ${updatedLens.brand},
      model = ${updatedLens.model}
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = lenses.user_id
      AND lenses.id = ${updatedLens.id}
    RETURNING
      lenses.*
  `;
  return lens;
}

export async function deleteLens(
  sessionToken: Session['token'],
  lensId: Lens['id'],
) {
  const [lens] = await sql<Lens[]>`
    DELETE FROM lenses USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = lenses.user_id
      AND lenses.id = ${lensId}
    RETURNING
      lenses.*
  `;
  return lens;
}
