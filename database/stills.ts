import type { Still } from '../migrations/00003-createTableStills';
import type { Session } from '../migrations/00005-createTableSessions';
import { sql } from './connect';

export async function getStills(sessionToken: Session['token']) {
  const stills = await sql<Still[]>`
    SELECT
      stills.*
    FROM
      stills
      INNER JOIN films ON films.id = stills.film_id
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = films.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return stills;
}

export async function getStill(
  sessionToken: Session['token'],
  stillId: Still['id'],
) {
  const [still] = await sql<Still[]>`
    SELECT
      stills.*
    FROM
      stills
      INNER JOIN films ON films.id = stills.film_id
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = films.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      stills.id = ${stillId}
  `;
  return still;
}

export async function createStill(
  sessionToken: Session['token'],
  newStill: Omit<Still, 'id'>,
) {
  const [still] = await sql<Still[]>`
    INSERT INTO
      stills (
        location,
        time,
        exposure_time,
        aperture,
        tag,
        film_id
      ) (
        SELECT
          ${newStill.location},
          ${newStill.time},
          ${newStill.exposureTime},
          ${newStill.aperture},
          ${newStill.tag},
          ${newStill.filmId}
        FROM
          films
          INNER JOIN sessions ON (
            sessions.token = ${sessionToken}
            AND sessions.user_id = films.user_id
            AND sessions.expiry_timestamp > now()
          )
        WHERE
          films.id = ${newStill.filmId}
      )
    RETURNING
      stills.*
  `;
  return still;
}

export async function updateStill(
  sessionToken: Session['token'],
  updatedStill: Omit<Still, 'filmId'>,
) {
  const [still] = await sql<Still[]>`
    UPDATE stills
    SET
      location = ${updatedStill.location},
      time = ${updatedStill.time},
      exposure_time = ${updatedStill.exposureTime},
      aperture = ${updatedStill.aperture},
      tag = ${updatedStill.tag}
    FROM
      films
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = films.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      films.id = stills.film_id
      AND stills.id = ${updatedStill.id}
    RETURNING
      stills.*
  `;
  return still;
}

export async function deleteStill(
  sessionToken: Session['token'],
  stillId: Still['id'],
) {
  const [still] = await sql<Still[]>`
    DELETE FROM stills USING films,
    sessions
    WHERE
      films.id = stills.film_id
      AND sessions.token = ${sessionToken}
      AND sessions.user_id = films.user_id
      AND sessions.expiry_timestamp > now()
      AND stills.id = ${stillId}
    RETURNING
      stills.*
  `;
  return still;
}
