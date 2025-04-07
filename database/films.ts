import type { Session } from '../migrations/00001-createTableSessions';
import type { Film } from '../migrations/00004-createTableFilms';
import { sql } from './connect';

export async function getFilms(sessionToken: Session['token']) {
  const films = await sql<Film[]>`
    SELECT
      films.*
    FROM
      films
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = films.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return films;
}

export async function getFilm(
  sessionToken: Session['token'],
  filmId: Film['id'],
) {
  const [film] = await sql<Film[]>`
    SELECT
      films.*
    FROM
      films
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = films.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      films.id = ${filmId}
  `;
  return film;
}

export async function createFilm(
  sessionToken: Session['token'],
  newFilm: Omit<Film, 'id' | 'userId'>,
) {
  const [film] = await sql<Film[]>`
    INSERT INTO
      films (
        user_id,
        brand,
        iso,
        images,
        development,
        current_status,
        style,
        camerafl_id,
        lens_id
      ) (
        SELECT
          user_id,
          ${newFilm.brand},
          ${newFilm.iso},
          ${newFilm.images},
          ${newFilm.development},
          ${newFilm.currentStatus},
          ${newFilm.style},
          ${newFilm.cameraflId},
          ${newFilm.lensId}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND expiry_timestamp > now()
      )
    RETURNING
      films.*
  `;
  return film;
}

export async function updateFilm(
  sessionToken: Session['token'],
  updatedFilm: Omit<Film, 'userId'>,
) {
  const [film] = await sql<Film[]>`
    UPDATE films
    SET
      brand = ${updatedFilm.brand},
      iso = ${updatedFilm.iso},
      images = ${updatedFilm.images},
      development = ${updatedFilm.development},
      current_status = ${updatedFilm.currentStatus},
      style = ${updatedFilm.style},
      camerafl_id = ${updatedFilm.cameraFLId},
      lens_id = ${updatedFilm.lensId}
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = films.user_id
      AND films.id = ${updatedFilm.id}
    RETURNING
      films.*
  `;
  return film;
}

export async function deleteFilm(
  sessionToken: Session['token'],
  filmId: Film['id'],
) {
  const [film] = await sql<Film[]>`
    DELETE FROM films USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = films.user_id
      AND films.id = ${filmId}
    RETURNING
      films.*
  `;
  return film;
}
