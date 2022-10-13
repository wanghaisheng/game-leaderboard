import axios, { AxiosResponse } from 'axios';

import { Game, ResponseError } from 'v1/types';

/**
 * Returns a list of all games.
 *
 * @category Games
 * @subcategory API
 * @function
 *
 * @return {Game[]} List of all games.
 */
export const getGamesList = async (BASE_URL: string): Promise<Game[]> => {
	const url = `${BASE_URL}/games/list`;

	const gamesResponse = await axios.get<
		Game[] | ResponseError,
		AxiosResponse<Game[] | ResponseError>
	>(url, { validateStatus: () => true });

	const { status, data } = gamesResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as Game[];
};
