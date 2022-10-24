const LOGO = 'http://cdn.masochist.me/mme_logo.png';

export const getGameThumbnail = (gameId?: number) => {
	if (gameId)
		return `https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`;
	else return LOGO;
};

export const getGameSteamUrl = (gameId: number): string => {
	return `http://store.steampowered.com/api/appdetails?appids=${gameId}`;
};
