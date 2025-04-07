import type { Session } from '../migrations/00001-createTableSessions';
import type { CameraFL } from '../migrations/00002-createTableCamerasFL';
import { sql } from './connect';

export async function getCameras(sessionToken: Session['token']) {
  const camerasFL = await sql<CameraFL[]>`
    SELECT
      camerasfl.*
    FROM
      camerasfl
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = cameras.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return camerasFL;
}

export async function getCameraFL(
  sessionToken: Session['token'],
  cameraId: CameraFL['id'],
) {
  const [cameraFL] = await sql<CameraFL[]>`
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
      camerasfl.id = ${cameraFLId}
  `;
  return cameraFL;
}

export async function createCameraFL(
  sessionToken: Session['token'],
  newCameraFL: Omit<CameraFL, 'id' | 'user_id'>,
) {
  const [cameraFL] = await sql<CameraFL[]>`
    INSERT INTO
      camerasfl (user_id, brand, model) (
        SELECT
          user_id,
          ${newCameraFL.brand},
          ${newCameraFL.model}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND expiry_timestamp > now()
      )
    RETURNING
      camerasfl.*
  `;
  return cameraFL;
}

export async function updateCameraFL(
  sessionToken: Session['token'],
  updatedCameraFL: Omit<CameraFL, 'user_id'>,
) {
  const [cameraFL] = await sql<CameraFL[]>`
    UPDATE camerasfl
    SET
      brand = ${updatedCameraFL.brand},
      model = ${updatedCameraFL.model}
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = camerasfl.user_id
      AND camerasfl.id = ${updatedCameraFL.id}
    RETURNING
      camerasfl.*
  `;
  return cameraFL;
}

export async function deleteCameraFL(
  sessionToken: Session['token'],
  cameraFLId: CameraFL['id'],
) {
  const [cameraFL] = await sql<CameraFL[]>`
    DELETE FROM camerasfl USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = camerasfl.user_id
      AND camerasfl.id = ${cameraFLId}
    RETURNING
      camerasfl.*
  `;
  return cameraFL;
}
