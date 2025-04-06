import { getDevelopersInsecure } from '../../database/developers';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { type Developer } from '../../migrations/00000-createTableDevelopers';

export type DevelopersRespopnseBodyGet = {
  developers: Developer[];
};

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<DevelopersRespopnseBodyGet>> {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);

  const developers = await getDevelopersInsecure();

  return ExpoApiResponse.json(
    {
      developers: developers,
    },
    {
      headers: {
        'Set-Cookie': 'test=123',
      },
    },
  );
}
