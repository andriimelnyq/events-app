import { CircularProgress } from "@mui/material";
import React from "react";
import classes from "./Loader.module.scss";

export const Loader = () => (
  <div className={classes.loader}>
    <CircularProgress
      sx={{
        margin: "auto",
      }}
    />
  </div>
);
