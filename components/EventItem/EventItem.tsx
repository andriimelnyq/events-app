import { EventType } from "@/types/EventType";
import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./EventItem.module.scss";
import { Button } from "@mui/material";
import Image from "next/image";

type Props = {
  event: EventType;
};

export const EventItem: React.FC<Props> = ({ event }) => {
  const { id, title, image, date, location, description } = event;

  const fixedDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card sx={{ maxWidth: 345 }} className={classes["event-item"]}>
      <div>
        <Image
          src={`/${image}`}
          alt="Event Image"
          width={350}
          height={140}
          className={classes["event-item__img"]}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {fixedDate}
          </Typography>

          <Typography variant="body2" sx={{ mb: 1.5 }}>
            {location}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </div>

      <CardActions className={classes["event-item__actions"]}>
        <Button size="small" color="primary" sx={{ p: 0 }} variant="contained">
          <Link
            href={`/events/${id}`}
            className={classes["event-item__button"]}
          >
            Explore Event
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};
