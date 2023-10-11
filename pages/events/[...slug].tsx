import { EventList } from "../../components/EventList";
import { getFilteredEvents } from "../../helpers/api";
import { EventType } from "../../types/EventType";
import Head from "next/head";
import React from "react";

type Props = {
  isInvalidData: boolean;
  isEmpty: boolean;
  filteredEvents: EventType[];
  filteredMonth: number;
  filteredYear: number;
};

export const FilteredEventsPage: React.FC<Props> = ({
  isInvalidData,
  isEmpty,
  filteredEvents,
  filteredMonth,
  filteredYear,
}) => {
  return (
    <div className="container page">
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${filteredMonth}/${filteredYear}`}
        />
      </Head>
      {isInvalidData ? (
        <p>Invalid Filter! Adjust your values</p>
      ) : (
        <EventList events={filteredEvents} />
      )}

      {isEmpty && <p>No events found for the chosen filter!</p>}
    </div>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const filterData = params.slug;

  const filteredYear = filterData ? +filterData[0] : 0;
  const filteredMonth = filterData ? +filterData[1] : 0;

  const isInvalidData =
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth > 12 ||
    filteredMonth < 1;

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  const isEmpty = !filteredEvents || filteredEvents.length === 0;

  return {
    props: {
      isInvalidData,
      isEmpty,
      filteredEvents,
      filteredMonth,
      filteredYear,
    },
  };
};

export default FilteredEventsPage;
