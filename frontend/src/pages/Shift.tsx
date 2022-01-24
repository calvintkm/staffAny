import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { getErrorMessage } from "../helper/error/index";
import { deleteShiftById, getShifts } from "../helper/api/shift";
import {
  createShiftPublish,
  getShiftPublish,
} from "../helper/api/shiftPublish";
import DataTable from "react-data-table-component";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink } from "react-router-dom";
import {
  dispatchGoPrevWeek,
  dispatchGoNextWeek,
  dispatchSetShiftData,
  dispatchSetShiftPublishData,
  dispatchUpdateShiftPublishData,
} from "../store/shift";
import WeekSelector from "../components/WeekSelector";
import { useShiftStateValue } from "../store/shift";
import { getMonday, getSunday, getYYYYMMDD } from "../helper/utils/date.utils";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "white",
    color: theme.color.turquoise,
  },

  buttonAdd: {
    marginLeft: 14,
    color: theme.color.turqouise,
    borderColor: theme.color.turqouise,
  },
  buttonPublish: {
    color: "white",
    marginLeft: 14,
    backgroundColor: theme.color.turqouise,
  },
}));

interface ActionButtonProps {
  id: string;
  disabled: boolean;
  onDelete: () => void;
}
const ActionButton: FunctionComponent<ActionButtonProps> = ({
  id,
  onDelete,
  disabled,
}) => {
  return (
    <div>
      <IconButton
        disabled={disabled}
        size="small"
        aria-label="delete"
        component={RouterLink}
        to={`/shift/${id}/edit`}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        disabled={disabled}
        size="small"
        aria-label="delete"
        onClick={() => onDelete()}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

const Shift = () => {
  const classes = useStyles();
  const history = useHistory();

  // const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const {
    activeDate,
    shiftsPublish,
    shifts,
    dispatch: shiftDispatcher,
  } = useShiftStateValue();

  const [activeShifts, setActiveShifts] = useState([]);

  useEffect(() => {
    const sunday = getSunday(activeDate);
    const monday = getMonday(activeDate);
    const _displayedRows = shifts.filter(
      ({ date }) => date >= monday && date <= sunday
    );
    // console.log("rows", rows, shifts);
    setActiveShifts(_displayedRows as never[]);
  }, [activeDate, shifts]);
  // }, [rows, activeDate, shifts]);

  // rows

  const onDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  };

  const onCloseDeleteDialog = () => {
    setSelectedId(null);
    setShowDeleteConfirm(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setErrMsg("");
        const { results: shifts } = await getShifts();
        const { results: shiftPublish } = await getShiftPublish();
        dispatchSetShiftPublishData(shiftDispatcher, {
          shiftsPublish: shiftPublish,
        });
        dispatchSetShiftData(shiftDispatcher, { shifts });

        // console.log(results);
      } catch (error) {
        const message = getErrorMessage(error);
        setErrMsg(message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Start Time",
      selector: "startTime",
      sortable: true,
    },
    {
      name: "End Time",
      selector: "endTime",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <ActionButton
          disabled={shiftsPublish[activeDate]?.published}
          id={row.id}
          onDelete={() => onDeleteClick(row.id)}
        />
      ),
    },
  ];

  const deleteDataById = async () => {
    try {
      setDeleteLoading(true);
      setErrMsg("");

      if (selectedId === null) {
        throw new Error("ID is null");
      }

      console.log(deleteDataById);

      await deleteShiftById(selectedId);

      const tempRows = [...shifts];
      // const tempRows = [...rows];
      const idx = tempRows.findIndex((v: any) => v.id === selectedId);
      tempRows.splice(idx, 1);
      // setRows(tempRows);
      dispatchSetShiftData(shiftDispatcher, { shifts: tempRows });
    } catch (error) {
      const message = getErrorMessage(error);
      setErrMsg(message);
    } finally {
      setDeleteLoading(false);
      onCloseDeleteDialog();
    }
  };

  const setActiveWeekChange = (changeType: "prev" | "next") => {
    if (changeType === "prev") {
      dispatchGoPrevWeek(shiftDispatcher);
    } else {
      dispatchGoNextWeek(shiftDispatcher);
    }
  };

  const publishActiveShift = async () => {
    const { results } = await createShiftPublish(activeDate);
    dispatchUpdateShiftPublishData(shiftDispatcher, {
      shiftPublish: results,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={`${classes.root}`}>
          <CardContent>
            <div
              className={`c-shift__header  ${
                shiftsPublish[activeDate]?.published ? "is-published" : ""
              }`}
            >
              <WeekSelector
                activeDate={activeDate}
                onActiveWeekChange={setActiveWeekChange}
              />
              <div className="c-buttons">
                {shiftsPublish[activeDate]?.published && (
                  <span className="c-shift__published-details ">
                    Shift has been published
                  </span>
                )}

                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  to="/shift/add"
                  disabled={shiftsPublish[activeDate]?.published}
                  component={RouterLink}
                  className={classes.buttonAdd}
                >
                  ADD SHIFT
                </Button>
                <Button
                  className={classes.buttonPublish}
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={shiftsPublish[activeDate]?.published || isLoading}
                  onClick={publishActiveShift}
                >
                  PUBLISH
                </Button>
              </div>
            </div>

            {errMsg.length > 0 ? (
              <Alert severity="error">{errMsg}</Alert>
            ) : (
              <></>
            )}
            <DataTable
              title="Shifts"
              columns={columns}
              data={activeShifts}
              pagination
              progressPending={isLoading}
            />
          </CardContent>
        </Card>
      </Grid>
      <Fab
        size="medium"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/shift/add")}
      >
        <AddIcon />
      </Fab>
      <ConfirmDialog
        title="Delete Confirmation"
        description={`Do you want to delete this data ?`}
        onClose={onCloseDeleteDialog}
        open={showDeleteConfirm}
        onYes={deleteDataById}
        loading={deleteLoading}
      />
    </Grid>
  );
};

export default Shift;
