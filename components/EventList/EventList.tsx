import { EventType } from "@/types/EventType";
import React from "react";
import { EventItem } from "../EventItem";
import styles from "./EventList.module.scss";

type Props = {
  events: EventType[];
};

export const EventList: React.FC<Props> = ({ events }) => {
  return (
    <div className={styles["event-list"]}>
      <div className={styles["event-list__content"]}>
        {events.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
};
