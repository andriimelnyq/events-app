import { EventList } from "@/components/EventList";
import { Filters } from "@/components/Filters";
import { getAllEvents } from "@/helpers/api";
import { EventType } from "@/types/EventType";

const AllEventsPage = ({ events }: { events: EventType[] }) => {
  return (
    <div className="container page">
      <Filters />

      <EventList events={events} />
    </div>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
