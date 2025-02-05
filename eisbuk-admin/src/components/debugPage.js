import React from "react";
import firebase from "firebase/app";
import { Container, Box, Button } from "@material-ui/core";
import AppbarAdmin from "../components/layout/AppbarAdmin";
import { functionsZone } from "../config/envInfo";
import { ORGANIZATION } from "../config/envInfo";
import { useTitle } from "../utils/helpers";

function invokeFunction(functionName) {
  return function () {
    firebase
      .app()
      .functions(functionsZone)
      .httpsCallable(functionName)({ organization: ORGANIZATION })
      .then(function (response) {
        console.log(response.data);
      });
  };
}

function createAdminTestUsers() {
  invokeFunction("createOrganization")();
  // Auth emulator is not currently accessible from within the functions
  firebase.auth().createUserWithEmailAndPassword("test@eisbuk.it", "test00");
}

const DebugPage = () => {
  useTitle("Debug");
  return (
    <Container maxWidth="sm">
      <AppbarAdmin />
      <Box my={4} color="primary">
        <Button
          onClick={createAdminTestUsers}
          color="secondary"
          variant="contained"
        >
          Create admin test users
        </Button>
      </Box>
      <Box my={4} color="secondary.main">
        <Button
          onClick={invokeFunction("createTestData")}
          color="primary"
          variant="contained"
        >
          Create test users
        </Button>
      </Box>
      <Box my={4} color="secondary.main">
        <Button
          onClick={invokeFunction("createTestSlots")}
          color="primary"
          variant="contained"
        >
          Create test slots
        </Button>
      </Box>
      <Box my={4} color="secondary.main">
        <Button
          onClick={invokeFunction("migrateSlotsToPluralCategories")}
          color="primary"
          variant="contained"
        >
          Migrate slots to plural categories
        </Button>
      </Box>
    </Container>
  );
};
export default DebugPage;
