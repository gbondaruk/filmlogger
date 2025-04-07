import { deleteFilm, getFilm, updateFilm } from '../../database/films';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { type Film, filmSchema } from '../../migrations/00004-createTableFilms';

export type FilmResponseBodyGet =
  | {
      film: Film;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
  { filmId }: { filmId: string },
): Promise<ExpoApiResponse<FilmResponseBodyGet>> {
  const film = await getFilm(Number(filmId));

  if (!film) {
    return ExpoApiResponse.json(
      {
        error: `No film with id ${filmId} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ film: film });
}

export type FilmResponseBodyPut =
  | {
      film: Film;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function PUT(
  request: Request,
  { filmId }: { filmId: string },
): Promise<ExpoApiResponse<FilmResponseBodyPut>> {
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

  const updatedFilm = await updateFilm({
    id: Number(filmId),
    firstName: result.data.firstName,
    lastName: result.data.lastName,
    attending: result.data.attending,
  });

  if (!updatedFilm) {
    return ExpoApiResponse.json(
      {
        error: `Film ${filmId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ film: updatedFilm });
}

export type FilmResponseBodyDelete =
  | {
      film: Film;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { filmId }: { filmId: string },
): Promise<ExpoApiResponse<FilmResponseBodyDelete>> {
  const film = await deleteFilm(Number(filmId));

  if (!film) {
    return ExpoApiResponse.json(
      {
        error: `Film ${filmId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ film: film });
}
