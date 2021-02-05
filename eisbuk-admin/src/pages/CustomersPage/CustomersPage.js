import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

import AppbarAdmin from "../../components/layout/AppbarAdmin";
import CustomerList from "../../components/customers/CustomerList";
import Copyright from "../../components/layout/Copyright";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Container,
  Fab,
  Grid,
  Paper,
  LinearProgress,
} from "@material-ui/core";

import { Add as AddIcon } from "@material-ui/icons";

import AddCustomer from "../../components/customers/AddCustomer";

const selectCustomers = (state) => state.firestore.ordered.customers;

const CustomersPage = () => {
  const classes = useStyles();
  const [addAthleteDialog, setAddAthleteDialog] = useState(false);
  const toggleAddAthleteDialog = () =>
    setAddAthleteDialog(addAthleteDialog ? false : true);
  const customers = useSelector(selectCustomers);

  return (
    <div className={classes.root}>
      <AppbarAdmin />
      <main className={classes.content}>
        {!isLoaded(customers) && <LinearProgress />}
        <Container maxWidth="lg" className={classes.customersContainer}>
          <div className={classes.appBarSpacer} />
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
                      <Fab
                        color="primary"
                        aria-label="Aggiungi atleta"
                        className={classes.fab}
                        onClick={toggleAddAthleteDialog}
                      >
                        <AddIcon />
                      </Fab>
                    </Box>
                  </Paper>
                ))
              }
              <AddCustomer
                open={addAthleteDialog}
                handleClose={toggleAddAthleteDialog}
              />
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
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

export default CustomersPage;
