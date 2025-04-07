import { createFilm, getFilms } from '../../database/films';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { type Film, filmSchema } from '../../migrations/00004-createTableFilms';

export type FilmsResponseBodyGet = {
  films: Film[];
};

export async function GET(): Promise<ExpoApiResponse<FilmsResponseBodyGet>> {
  const films = await getFilms();

  return ExpoApiResponse.json({
    films: films,
  });
}

export type FilmsResponseBodyPost =
  | {
      film: Film;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<FilmsResponseBodyPost>> {
  const requestBody = await request.json();

  const result = filmSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain film object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const newFilm = {
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    attending: result.data.attending,
  };

  const film = await createFilm(newFilm);

  if (!film) {
    return ExpoApiResponse.json(
      {
        error: 'Film not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ film: film });
}
