import * as React from "react";
import ReactDOM from "react-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  MenuItem,
  Tooltip,
  Menu,
  Button,
  Box,
} from "@mui/material";
import Title from "./Title";
import {
  Drafts,
  Mail,
  DeleteForever,
  MoreVert,
  MarkAsUnread,
  MarkEmailRead,
  PriorityHigh,
  LowPriority,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPetitions,
  readAdoption,
  deletePetition,
  unReadAdoption,
  toggleimportance,
} from "../../redux/actions/adoptionAction";
import { Link } from "react-router-dom";
import { ModalAdmin } from "./Dashboard";

function getDate(date) {
  let simplyDate = "";
  let now = new Date(Date.now());
  let completeDate = new Date(date);
  let day = completeDate.getDay();
  let month = completeDate.getMonth();
  let year = completeDate.getFullYear();
  let hour = completeDate.getHours();
  let minutes = completeDate.getMinutes();
  if (now.getMinutes() - minutes < 60 && now.getHours() - hour < 1) {
    let minutesAgo = now.getMinutes() - minutes;
    simplyDate = `${minutesAgo} mins ago `;
  } else if (
    now.getMinutes() - minutes + 60 > 60 &&
    now.getHours() - hour >= 1 &&
    now.getHours() - hour < 24 &&
    now.getDay() - day < 1
  ) {
    let hoursAgo = now.getHours() - hour;
    simplyDate = `${hoursAgo} hrs ago`;
  } else if (
    now.getMinutes() - minutes + 60 > 60 &&
    now.getHours() - hour > 24 &&
    now.getDay() - day < 30
  ) {
    let daysAgo = now.getDay() - day;
    simplyDate = `${daysAgo} dys ago`;
  } else {
    simplyDate = `${day}/${month}/${year}`;
  }
  return simplyDate;
}

function TableMenu({ row, read, unread }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function deletePetitionfn(id) {
    dispatch(deletePetition(id));
    setTimeout(() => {
      dispatch(getAllPetitions());
    }, 500);
  }
  function toggleImportancefn(id) {
    dispatch(toggleimportance(id));
    setTimeout(() => {
      dispatch(getAllPetitions());
    }, 500);
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          width: "1em",
        }}
      >
        <Tooltip title="Table Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "table-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Button
            onClick={() => deletePetitionfn(row.id)}
            size="small"
            startIcon={<DeleteForever />}
          >
            Delete
          </Button>
        </MenuItem>
        <MenuItem>
          {row.read === true ? (
            <Button
              onClick={() => unread(row.id)}
              size="small"
              startIcon={<MarkAsUnread />}
            >
              Mark as unread
            </Button>
          ) : (
            <Button
              onClick={() => read(row.id)}
              size="small"
              startIcon={<MarkEmailRead />}
            >
              Mark as read
            </Button>
          )}
        </MenuItem>
        <MenuItem>
          {row.isImportant === true ? (
            <Button
              onClick={() => toggleImportancefn(row.id)}
              size="small"
              startIcon={<LowPriority />}
            >
              Mark as not important
            </Button>
          ) : (
            <Button
              onClick={() => toggleImportancefn(row.id)}
              size="small"
              startIcon={<PriorityHigh />}
            >
              Mark as important
            </Button>
          )}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

function preventDefault(event) {
  event.preventDefault();
}

export default function AdoptionPetitions() {
  let { petitions } = useSelector((state) => state.petitions);
  let dispatch = useDispatch();
  const [petitionDetail, setPetition] = React.useState({});
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (petitions.length === 0) {
      dispatch(getAllPetitions());
    } else {
      setInterval(() => {
        dispatch(getAllPetitions());
      }, 150000);
    }
  }, [petitions, show]);

  function readAdoptionfn(id) {
    dispatch(readAdoption(id));
    setTimeout(() => {
      dispatch(getAllPetitions());
    }, 500);
  }
  function unreadAdoptionfn(id) {
    dispatch(unReadAdoption(id));
    setTimeout(() => {
      dispatch(getAllPetitions());
    }, 500);
  }

  function getAdoptionPetition(petition) {
    setPetition(petition);
    setShow(true);
    if (petition.read === true) {
      unreadAdoptionfn(petition.id);
    } else {
      readAdoptionfn(petition.id);
    }
  }

  return (
    <React.Fragment>
      {show &&
        ReactDOM.createPortal(
          <ModalAdmin item={petitionDetail} setOpen={setShow} open={show} />,
          document.querySelector("#adminModal")
        )}
      <Title>Requested adoptions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell size="small" align="center"></TableCell>
            <TableCell size="small" align="center">
              Solicitation date
            </TableCell>
            <TableCell size="small" align="center">
              User
            </TableCell>
            <TableCell size="small" align="center">
              Animal
            </TableCell>
            <TableCell size="small" align="center">
              Location
            </TableCell>
            <TableCell size="small" align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {petitions.map((p) => (
            <TableRow key={p.id}>
              <TableCell size="small" align="center">
                {p.isImportant === false ? (
                  <div></div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: ".1em",
                    }}
                  >
                    <PriorityHigh sx={{ color: "red" }} />
                  </div>
                )}
              </TableCell>
              <TableCell size="small" align="center">
                {getDate(p.createdAt)}
              </TableCell>
              <TableCell size="small" align="center">
                {p?.user?.name} {p?.user?.lastName}
              </TableCell>
              <TableCell size="small" align="center">
                <Link to={`/home/animals/${p?.animal?.id}`}>
                  {p?.animal?.name}
                </Link>
              </TableCell>
              <TableCell size="small" align="center">
                {p?.user?.location}
              </TableCell>
              <TableCell size="small" align="center">
                {p.read === true ? (
                  <IconButton
                    size="small"
                    onClick={() => getAdoptionPetition(p)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1em",
                    }}
                  >
                    <Drafts />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    onClick={() => getAdoptionPetition(p)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "1em",
                    }}
                  >
                    <Badge variant="dot" color="error">
                      <Mail color="action" />
                    </Badge>
                  </IconButton>
                )}
              </TableCell>
              <TableCell size="small" align="center">
                <TableMenu
                  row={p}
                  read={readAdoptionfn}
                  unread={unreadAdoptionfn}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
