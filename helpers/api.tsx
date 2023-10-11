import axios from "axios";

export const getFeaturedEvents = async () => {
  const response = await axios.get(
    "https://events-app-a3ca9-default-rtdb.europe-west1.firebasedatabase.app/events.json?orderBy=%22isFeatured%22&equalTo=true",
  );

  const data = response.data;
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getEventById = async (id: string) => {
  const response = await axios.get(
    `https://events-app-a3ca9-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`,
  );

  return {
    id,
    ...response.data,
  };
};

export const getAllEvents = async () => {
  const response = await axios.get(
    "https://events-app-a3ca9-default-rtdb.europe-west1.firebasedatabase.app/events.json",
  );

  const data = response.data;
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;
  const fixedMonth = `${month}`.length === 1 ? `0${month}` : `${month}`;

  const response = await axios.get(
    `https://events-app-a3ca9-default-rtdb.europe-west1.firebasedatabase.app/events.json?orderBy="date"&startAt="${year}-${fixedMonth}-01"&endAt="${year}-${fixedMonth}-31"`,
  );

  const data = response.data;
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const postNewsletterEmail = async (email: string) => {
  const response = await axios.post(
    "/api/newsletter",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const postComment = async (
  eventId: string,
  data: {
    email: string;
    name: string;
    text: string;
  },
) => {
  const response = await axios.post(
    `/api/comments/${eventId}`,
    {
      ...data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const getCommentsById = async (id: string) => {
  const response = await axios.get("/api/comments/" + id);

  return response.data.comments;
};
