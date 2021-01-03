import React from 'react';
import { orderBy } from 'lodash';
import { useSelector } from 'react-redux';
import { swapRatingToIcon } from '../../../../shared/helpers/helper';
import { SmallEvent, Section, SectionTitle } from '../../';

export default function SectionHistory() {
  const events = useSelector((state: any) =>
    orderBy(state.events, ['date'], ['desc']).slice(0, 10),
  );
  const games = useSelector((state: any) => state.games);
  const members = useSelector((state: any) => state.members);
  const rating = useSelector((state: any) => state.rating);

  const sortEvents = (event: any, eventIndex: number) => {
    const player = members.find(
      (m: any) => Number(m.id) === Number(event.member),
    );
    const game = games.find((g: any) => Number(g.id) === Number(event.game));

    switch (event.type) {
      case 'memberJoined':
        return player ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-user-plus"></i>
            <span className="bold"> {player.name}</span> has joined the group!
          </SmallEvent>
        ) : null;
      case 'memberLeft':
        return player ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-user-minus"></i>
            <span className="bold"> {player.name}</span> has left the group!
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
        return player && game ? (
          <SmallEvent key={`sidebar-event-${eventIndex}`}>
            <i className="fas fa-check-square"></i>
            <span className="bold"> {player.name}</span> completed{' '}
            <span className="bold">{game.title}</span>!
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
        const { text, icon, member } = content;
        if (!text) {
          return null;
        }
        let player;
        if (member) {
          player = members.find((m: any) => Number(m.id) === Number(member));
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
      {events.map((event, eventIndex) => sortEvents(event, eventIndex))}
    </Section>
  );
}