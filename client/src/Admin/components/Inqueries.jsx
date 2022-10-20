import * as React from "react";
import ReactDOM from "react-dom";
import Typography from "@mui/material/Typography";
import { Clear, ClearAll } from "@mui/icons-material";
import Title from "./Title";
import { Card, Box, Stack, IconButton, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInquieres,
  delateOneInquery,
  cleanAllInqueries,
  clearAll,
} from "../../redux/actions/inquiryActions";
import { ModalAdmin } from "./Dashboard";
import axios from "axios";

export default function ShowInqueries() {
  let { inqueries } = useSelector((state) => state.inqueries);
  let dispatch = useDispatch();
  let loading = "Any inquery yet";
  const [open, setOpen] = React.useState(false);
  const [queriedInquery, setInquery] = React.useState({});

  React.useEffect(() => {
    if (inqueries.length === 0) {
      dispatch(getAllInquieres());
    }
  }, [inqueries, open]);

  async function deleteInquery(id) {
    // dispatch(delateOneInquery(id));
    try {
      await axios.delete(`/admin/inquiry/${id}`);
      alert("inquiry deleted");
      dispatch(clearAll());
      dispatch(getAllInquieres());
    } catch (error) {
      console.log(error);
    }
  }

  function queryInquery(inquery) {
    setInquery(inquery);
    setOpen(true);
  }
  function cleanAll() {
    dispatch(cleanAllInqueries);
  }

  function InqueryCard({ inquery }) {
    return (
      <Card
        sx={{
          height: "fit-content",
          overflowWrap: "anywhere",
          marginTop: "1%",
        }}
      >
        <Box sx={{ height: "fit-content", margin: "auto" }}>
          <Stack direction="row" sx={{ height: "2em", margin: "auto" }}>
            <Button
              onClick={() => queryInquery(inquery)}
              sx={{
                height: "fit-content",
                width: "100%",
                margin: "auto",
                padding: "1%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1em",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ margin: "auto", alignSelf: "center" }}>
                  {inquery.topic}
                </Box>
              </Typography>
            </Button>
            <IconButton
              onClick={() => deleteInquery(inquery.id)}
              sx={{ height: "fit-content", alignContent: "center" }}
            >
              <Clear sx={{ fontSize: ".6em" }} />
            </IconButton>
          </Stack>
        </Box>
      </Card>
    );
  }
  return (
    <React.Fragment>
      <Title>Inqueries</Title>
      <>
        {open &&
          ReactDOM.createPortal(
            <ModalAdmin item={queriedInquery} setOpen={setOpen} open={open} />,
            document.querySelector("#adminModal")
          )}
      </>
      {inqueries.length === 0 ? (
        <h1>{loading}</h1>
      ) : (
        inqueries.map((s) => {
          return <InqueryCard key={s.id} inquery={s} />;
        })
      )}
      {/* <div style={{ position: "sticky", bottom: "0%" }}>
        <IconButton size="small" variant="contained" onClick={() => cleanAll()}>
          <ClearAll />
        </IconButton>
      </div> */}
    </React.Fragment>
  );
}
