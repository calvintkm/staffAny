import React, { FunctionComponent } from "react";
import { Button, makeStyles } from "@material-ui/core";
import {
  convertToMMDD,
  getMonday,
  getSunday,
} from "../helper/utils/date.utils";
interface Prop {
  activeDate: string;
  onActiveWeekChange: Function;
}

const WeekSelector: FunctionComponent<Prop> = ({
  activeDate,
  onActiveWeekChange,
}) => {
  const startOfWeek = getMonday(activeDate);
  const endOfWeek = getSunday(activeDate);

  const prevButtonClickHandler = () => {
    onActiveWeekChange("prev");
  };
  const nextButtonClickHandler = () => {
    onActiveWeekChange("next");
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      padding: "5px",
      width: "2rem",
      minWidth: "unset",
      height: "2rem",
      color: "inherit",
    },
    dateString: {
      margin: "0 12px",
    },
  }));
  const classes = useStyles();

  return (
    <h1>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={prevButtonClickHandler}
      >
        {"<"}
      </Button>
      <span className={classes.dateString}>
        {convertToMMDD(startOfWeek)} - {convertToMMDD(endOfWeek)}
      </span>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={nextButtonClickHandler}
      >
        {">"}
      </Button>
    </h1>
  );
};
export default WeekSelector;
