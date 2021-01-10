import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { orderBy } from 'lodash';
import { swapRatingToIcon } from 'shared/helpers/helper';
import { SmallEvent, Section, SectionTitle, MemberLink } from '../';
import Spinner from 'shared/components/Spinner';

export default function SectionHistory(): JSX.Element {
  const history = useHistory();
  const events = useSelector((state: any) =>
    orderBy(state.events, ['date'], ['desc']).slice(0, 10),
  );
  const games = useSelector((state: any) => state.games.list);
  const users = useSelector((state: any) => state.users.list);
  const rating = useSelector((state: any) => state.rating);
  const badges = useSelector((state: any) => state.badges);

  const sortEvents = (event: any, eventIndex: number) => {
    const user = users.find((m: any) => m.id === event.member);
    const game = games.find((g: any) => Number(g.id) === Number(event.game));
    const badge = badges.find((b: any) => b['_id'] === event.badge);

    // console.log(badge);

    const onUserClick = () => user?.id && history.push(`/profile/${user.id}`);

    switch (event.type) {
      case 'memberJoined':
        return user ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-user-plus"></i>
            <MemberLink className="bold" onClick={onUserClick}>
              {' '}
              {user.name}
            </MemberLink>{' '}
            has joined the group!
          </SmallEvent>
        ) : null;
      case 'memberLeft':
        return user ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-user-minus"></i>
            <MemberLink className="bold" onClick={onUserClick}>
              {' '}
              {user.name}
            </MemberLink>{' '}
            has left the group!
          </SmallEvent>
        ) : null;
      case 'newGame':
        return game ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-plus-square"></i>
            <span className="bold"> {game.title}</span> has been curated!
          </SmallEvent>
        ) : null;
      case 'complete':
        return user && game ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-check-square"></i>
            <MemberLink className="bold" onClick={onUserClick}>
              {' '}
              {user.name}
            </MemberLink>{' '}
            completed <span className="bold">{game.title}</span>!
          </SmallEvent>
        ) : null;
      case 'tierChange':
        return game ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-undo-alt"></i>
            <span className="bold"> {game.title}</span> changed its tier to{' '}
            <i className={swapRatingToIcon(game.rating, rating)} />!
          </SmallEvent>
        ) : null;
      case 'badgeAdded': {
        return badge && game ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-award"></i>
            <span className="bold"> {game.title}</span> got a new badge!
          </SmallEvent>
        ) : null;
      }
      case 'badgeGiven':
        return user && badge ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-medal"></i>
            <MemberLink className="bold" onClick={onUserClick}>
              {' '}
              {user.name}{' '}
            </MemberLink>{' '}
            got a new badge - <span className="bold">{badge.name}</span>!
          </SmallEvent>
        ) : null;
      case 'achievementNumberChange':
        return game ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-tasks"></i>
            <span className="bold"> {game.title}</span>{' '}
            {event.oldNumber < event.newNumber
              ? `got ${event.newNumber - event.oldNumber} new achievements!`
              : `had ${
                  event.oldNumber - event.newNumber
                } achievements removed!`}
          </SmallEvent>
        ) : null;
      case 'custom': {
        const { content } = event;
        if (!content) {
          return null;
        }
        const { text, icon } = content;
        if (!text) {
          return null;
        }

        return (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className={icon ? icon : 'fas fa-birthday-cake'}></i>{' '}
            {text &&
              text.split('#').map((str: string, index: number) => {
                if (index % 2 === 1) {
                  return <span className="bold">{str}</span>;
                }
                return str;
              })}
          </SmallEvent>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Section>
      <SectionTitle>Last events</SectionTitle>
      {events.length ? (
        events.map((event, eventIndex) => sortEvents(event, eventIndex))
      ) : (
        <Spinner />
      )}
    </Section>
  );
}