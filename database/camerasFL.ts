import type { Session } from '../migrations/00001-createTableSessions';
import type { Camerafl } from '../migrations/00002-createTableCamerasfl';
import { sql } from './connect';

export async function getCameras(sessionToken: Session['token']) {
  const camerasfl = await sql<Camerafl[]>`
    SELECT
      camerasfl.*
    FROM
      camerasfl
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = camerasfl.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return camerasfl;
}

export async function getCamerafl(
  sessionToken: Session['token'],
  cameraflId: Camerafl['id'],
) {
  const [camerafl] = await sql<Camerafl[]>`
    SELECT
      camerasfl.*
    FROM
      camerasfl
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = camerasfl.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      camerasfl.id = ${cameraflId}
  `;
  return camerafl;
}

export async function createCamerafl(
  sessionToken: Session['token'],
  newCamerafl: Omit<Camerafl, 'id' | 'user_id'>,
) {
  const [camerafl] = await sql<Camerafl[]>`
    INSERT INTO
      camerasfl (user_id, brand, model) (
        SELECT
          user_id,
          ${newCamerafl.brand},
          ${newCamerafl.model}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND expiry_timestamp > now()
      )
    RETURNING
      camerasfl.*
  `;
  return camerafl;
}

export async function updateCamerafl(
  sessionToken: Session['token'],
  updatedCamerafl: Omit<Camerafl, 'user_id'>,
) {
  const [camerafl] = await sql<Camerafl[]>`
    UPDATE camerasfl
    SET
      brand = ${updatedCamerafl.brand},
      model = ${updatedCamerafl.model}
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = camerasfl.user_id
      AND camerasfl.id = ${updatedCamerafl.id}
    RETURNING
      camerasfl.*
  `;
  return camerafl;
}

export async function deleteCamerafl(
  sessionToken: Session['token'],
  cameraflId: Camerafl['id'],
) {
  const [camerafl] = await sql<Camerafl[]>`
    DELETE FROM camerasfl USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = camerasfl.user_id
      AND camerasfl.id = ${cameraflId}
    RETURNING
      camerasfl.*
  `;
  return camerafl;
}
