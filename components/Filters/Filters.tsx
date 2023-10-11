import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import classes from "./Filters.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export const Filters = () => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullPath = `/events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  };

  return (
    <form className={classes.filters} onSubmit={(e) => submitHandler(e)}>
      <FormControl className={classes["filters__item"]}>
        <InputLabel id="select-label-year">Year</InputLabel>
        <Select
          labelId="select-label-year"
          value={selectedYear}
          label="Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes["filters__item"]}>
        <InputLabel id="select-label-month">Month</InputLabel>
        <Select
          labelId="select-label-month"
          value={selectedMonth}
          label="Month"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <MenuItem value={1}>January</MenuItem>
          <MenuItem value={2}>Fabruary</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>August</MenuItem>
          <MenuItem value={9}>September</MenuItem>
          <MenuItem value={10}>October</MenuItem>
          <MenuItem value={11}>November</MenuItem>
          <MenuItem value={12}>December</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained">
        Find Events
      </Button>
    </form>
  );
};
