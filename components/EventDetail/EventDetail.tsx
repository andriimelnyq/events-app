import { EventType } from "@/types/EventType";
import { Commments } from "../Comments";
import { Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Image from "next/image";
import styles from "./EventDetail.module.scss";

type Props = {
  event: EventType;
};

export const EventDetail: React.FC<Props> = ({ event }) => {
  return (
    <div className={styles["event-detail"] + " container page"}>
      <Typography variant="h3">{event.title}</Typography>

      <div className={styles["event-detail__main"]}>
        <Image
          src={`/${event.image}`}
          alt="Event Image"
          width={200}
          height={200}
          className={styles["event-detail__image"]}
        />

        <div className={styles["event-detail__info"]}>
          <div className={styles["event-detail__info-item"]}>
            <CalendarMonthIcon />

            <Typography variant="h6">{event.date}</Typography>
          </div>

          <div className={styles["event-detail__info-item"]}>
            <AddLocationIcon />

            <Typography variant="h6">{event.location}</Typography>
          </div>
        </div>
      </div>

      <Typography variant="h5" textAlign={"center"}>
        {event.description}
      </Typography>

      <Commments eventId={event.id} />
    </div>
  );
};
