import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import CustomerList from "../../components/customers/CustomerList";
import Copyright from "../../components/layout/Copyright";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Typography } from "@material-ui/core";

import AddCustomer from "../../components/customers/AddCustomer";
import { wrapOrganization } from "../../utils/firestore";

const CustomersPage = () => {
  const classes = useStyles();
  useFirestoreConnect([wrapOrganization({ collection: "customers" })]);
  const [addAthleteDialog, setAddAthleteDialog] = useState(false);
  const toggleAddAthleteDialog = () =>
    setAddAthleteDialog(addAthleteDialog ? false : true);
  const customers = useSelector((state) => state.firestore.ordered.customers);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Box py={3} container={true} className={classes.headerHero}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg">
            <Typography className={classes.pageTitle} variant="h1">
              Atleti
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={toggleAddAthleteDialog}
            >
              Aggiungi
            </Button>
            <AddCustomer
              open={addAthleteDialog}
              handleClose={toggleAddAthleteDialog}
            />
          </Container>
        </Box>
        {!isLoaded(customers) && <LinearProgress />}
        <Container maxWidth="lg" className={classes.customersContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {
                (isLoaded(customers),
                !isEmpty(customers) && (
                  <Paper>
                    <Box p={3}>
                      <CustomerList
                        customers={customers.map((o) => ({
                          ...o,
                          tableData: {},
                        }))}
                      />
                    </Box>
                  </Paper>
                ))
              }
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  headerHero: {
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(3),
  },
  pageTitle: {
    color: theme.palette.primary.contrastText,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  customersContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export default CustomersPage;
