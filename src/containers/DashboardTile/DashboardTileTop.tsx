import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useLeaderboardsMembers, useCuratorMembers } from 'sdk';
import { EventLink, Section, SectionProps } from 'containers';
import { Flex, Skeleton } from 'components';

const NUMBER_OF_LEADERS = 10;

export const DashboardTileTop = (
	props: Omit<SectionProps, 'content' | 'title'>,
): JSX.Element => {
	const history = useHistory();

	const {
		membersData,
		isLoading: isMembersLoading,
		isFetched: isMembersFetched,
	} = useCuratorMembers();
	const {
		leaderboardsData,
		isLoading: isLeadersLoading,
		isFetched: isLeadersFetched,
	} = useLeaderboardsMembers(NUMBER_OF_LEADERS);

	const isLoading = isMembersLoading && isLeadersLoading;
	const isFetched = isMembersFetched && isLeadersFetched;

	const leaderboards = leaderboardsData.map(leader => ({
		position: leader.position,
		memberId: leader.memberId,
		sum: leader.sum,
		name:
			membersData.find(member => member.steamId === leader.memberId)?.name ??
			'UNKNOWN',
	}));

	const leaderboardRow = (leader: {
		sum: number;
		name: string;
		memberId: string;
		position: number;
	}) => {
		const onUserClick = () => history.push(`/profile/${leader.memberId}`);
		return (
			<StyledSectionTopMember row align key={`leaderboards-${leader.memberId}`}>
				<div>{leader.position}.</div>
				<EventLink
					onClick={onUserClick}
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
					<span>{leader.name}</span>
				</EventLink>
				<div style={{ whiteSpace: 'nowrap' }}>{leader.sum} pts</div>
			</StyledSectionTopMember>
		);
	};

	const loadingLeaders = new Array(NUMBER_OF_LEADERS)
		.fill(null)
		.map((_, i: number) => (
			<Skeleton key={`badge-new-${i}`} height={22} width="100%" />
		));

	return (
		<Section
			title="Top 10 users"
			minWidth="400px"
			maxWidth="450px"
			content={
				<Flex column align justify gap={5}>
					{isLoading && loadingLeaders}
					{isFetched && leaderboards?.map(leader => leaderboardRow(leader))}
				</Flex>
			}
			{...props}
		/>
	);
};

export const StyledSectionTopMember = styled(Flex)`
	width: 100%;
	justify-content: space-between;
	padding: 0 16px;
`;