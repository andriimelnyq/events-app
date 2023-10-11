import Head from "next/head";
import { EventList } from "@/components/EventList";
import { getFeaturedEvents } from "@/helpers/api";
import { EventType } from "@/types/EventType";
import { NewsletterRegistration } from "@/components/NewsletterRegistration";

type Props = {
  events: EventType[];
};

const HomePage: React.FC<Props> = ({ events }) => {
  return (
    <div className="container page">
      <Head>
        <title>Events App</title>
        <meta name="description" content="Find a lot of great events..." />
      </Head>

      <NewsletterRegistration />

      <EventList events={events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
