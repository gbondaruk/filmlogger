import type { Camera } from '../migrations/00001-createTableCameras';
import type { Session } from '../migrations/00005-createTableSessions';
import { sql } from './connect';

export async function getCameras(sessionToken: Session['token']) {
  const cameras = await sql<Camera[]>`
    SELECT
      cameras.*
    FROM
      cameras
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = cameras.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return cameras;
}

export async function getCamera(
  sessionToken: Session['token'],
  cameraId: Camera['id'],
) {
  const [camera] = await sql<Camera[]>`
    SELECT
      cameras.*
    FROM
      cameras
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = cameras.user_id
        AND sessions.expiry_timestamp > now()
      )
    WHERE
      cameras.id = ${cameraId}
  `;
  return camera;
}

export async function createCamera(
  sessionToken: Session['token'],
  newCamera: Omit<Camera, 'id' | 'user_id'>,
) {
  const [camera] = await sql<Camera[]>`
    INSERT INTO
      cameras (user_id, brand, model) (
        SELECT
          user_id,
          ${newCamera.brand},
          ${newCamera.model}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND expiry_timestamp > now()
      )
    RETURNING
      cameras.*
  `;
  return camera;
}

export async function updateCamera(
  sessionToken: Session['token'],
  updatedCamera: Omit<Camera, 'user_id'>,
) {
  const [camera] = await sql<Camera[]>`
    UPDATE cameras
    SET
      brand = ${updatedCamera.brand},
      model = ${updatedCamera.model}
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = cameras.user_id
      AND cameras.id = ${updatedCamera.id}
    RETURNING
      cameras.*
  `;
  return camera;
}

export async function deleteCamera(
  sessionToken: Session['token'],
  cameraId: Camera['id'],
) {
  const [camera] = await sql<Camera[]>`
    DELETE FROM cameras USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = cameras.user_id
      AND cameras.id = ${cameraId}
    RETURNING
      cameras.*
  `;
  return camera;
}
