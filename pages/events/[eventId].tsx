import { EventDetail } from "@/components/EventDetail/EventDetail";
import { getEventById, getFeaturedEvents } from "@/helpers/api";
import { EventType } from "@/types/EventType";
import Head from "next/head";

const EventDetailPage = ({ event }: { event: EventType }) => {
  return event ? (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventDetail event={event} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export const getStaticProps = async (context: {
  params: { eventId: string };
}) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
