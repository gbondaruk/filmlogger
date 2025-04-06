import type { Camera } from '../migrations/00001-createTableCameras';
import { sql } from './connect';

import type

export const getCamerasInsecure = async () => {
  const cameras = await sql<Camera[]>`
    SELECT
      *
    FROM
      cameras
  `;
  return cameras;
};

export const getCameraInsecure = async (cameraId: Camera['id']) => {
  const [camera] = await sql<Camera[]>`
    SELECT
      *
    FROM
      cameras
    WHERE
      id = ${cameraId}
  `;
  return camera;
};

export const createCameraInsecure = async (newCamera: Omit<Camera, 'id'>) => {
  const [camera] = await sql<Camera[]>`
    INSERT INTO
      cameras (brand, model,)
    VALUES
      (
        ${newCamera.brand},
        ${newCamera.model}
      )
    RETURNING
      cameras.*
  `;
  return camera;
};

export const updateCameraInsecure = async (updatedCamera: Camera) => {
  const [camera] = await sql<Camera[]>`
    UPDATE cameras
    SET
      brand = ${updatedCamera.brand},
      model = ${updatedCamera.model}
    WHERE
      id = ${updatedCamera.id}
    RETURNING
      cameras.*
  `;
  return camera;
};

export const deleteCameraInsecure = async (cameraId: Camera['id']) => {
  const [camera] = await sql<Camera[]>`
    DELETE FROM cameras
    WHERE
      id = ${cameraId}
    RETURNING
      cameras.*
  `;
  return camera;
};
