import { useMemo } from 'react';
import styled from 'styled-components';
import { Featured, FeaturedType } from '@masochistme/sdk/dist/v1/types';

import { Section, SectionProps } from 'containers';
import { Flex, Loader, Pagination } from 'components';

import { FeaturedNews, FeaturedVideo } from 'containers/Featured';

type Props = Omit<SectionProps, 'content' | 'title'> & {
	featuredData: Featured[];
	isLoading: boolean;
	isFetched: boolean;
	isError: boolean;
	activeIndex: number;
	setActiveIndex: (activeIndex: number) => void;
};
export const DashboardTileFeatured = (props: Props): JSX.Element => {
	const {
		featuredData,
		isLoading,
		isFetched,
		isError,
		activeIndex,
		setActiveIndex,
	} = props;

	const featuredContent = useMemo(() => {
		const featured = featuredData?.[activeIndex];
		if (!featured || !isFetched || isError) return null;

		if (featured.type === FeaturedType.NEWS)
			return <FeaturedNews featured={featured} />;
		if (featured.type === FeaturedType.VIDEO)
			return <FeaturedVideo featured={featured} />;
	}, [featuredData, isFetched, isError, activeIndex]);

	return (
		<Section
			title="Featured"
			content={
				<StyledContent column>
					{isLoading ? <Loader /> : featuredContent}
					<Pagination
						nrOfItems={featuredData.length}
						activeIndex={activeIndex}
						setActiveIndex={setActiveIndex}
						trackId={`featured.pagination`}
					/>
				</StyledContent>
			}
			{...props}
		/>
	);
};

const StyledContent = styled(Flex)`
	gap: 12px;
	justify-content: space-between;
	height: 100%;
`;
