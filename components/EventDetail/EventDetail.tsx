import { EventType } from "@/types/EventType";
import { Commments } from "../Comments";

type Props = {
  event: EventType;
};

export const EventDetail: React.FC<Props> = ({ event }) => {
  return (
    <>
      <div>{event.description}</div>
      <Commments eventId={event.id} />
    </>
  );
};
