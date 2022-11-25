import { IconType } from 'components';

export enum TabDict {
	HOME = 'home',
	LEADERBOARDS = 'leaderboards',
	GAME = 'game',
	GAMES = 'games',
	EVENTS = 'events',
	PROFILE = 'profile',
	RACES = 'races',
	BADGES = 'badges',
	SUPPORT = 'support',
}

export type Tab = {
	id: TabDict;
	text: string;
	icon: IconType;
	link: string;
	visible: boolean;
	external: boolean;
};

export const tabs: Tab[] = [
	{
		id: TabDict.HOME,
		text: 'home',
		icon: 'Home',
		link: '',
		visible: true,
		external: false,
	},
	{
		id: TabDict.LEADERBOARDS,
		text: 'leaderboards',
		icon: 'Medal',
		link: 'leaderboards',
		visible: true,
		external: false,
	},
	{
		id: TabDict.GAMES,
		text: 'game list',
		icon: 'Gamepad',
		link: 'games',
		visible: true,
		external: false,
	},
	{
		id: TabDict.BADGES,
		text: 'badges',
		icon: 'Badge',
		link: 'badges',
		visible: true,
		external: false,
	},
	// {
	// 	id: TabDict.RACES,
	// 	text: 'races',
	// 	icon: 'Finish',
	// 	link: 'races',
	// 	visible: true,
	// 	external: false,
	// },
	{
		id: TabDict.EVENTS,
		text: 'event log',
		icon: 'History',
		link: 'events',
		visible: true,
		external: false,
	},
	{
		id: TabDict.SUPPORT,
		text: 'support',
		icon: 'Heart',
		link: 'support',
		visible: true,
		external: false,
	},
	{
		id: TabDict.PROFILE,
		text: 'profile',
		icon: 'IDCard',
		link: 'profile',
		visible: false,
		external: false,
	},
	{
		id: TabDict.GAME,
		text: 'game',
		icon: 'Puzzle',
		link: 'game',
		visible: false,
		external: false,
	},
];
