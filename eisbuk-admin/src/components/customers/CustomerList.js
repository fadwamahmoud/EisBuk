import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CustomerForm from "../../components/customers/CustomerForm";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  DateRange as DateRangeIcon,
} from "@material-ui/icons";
import {
  Box,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

import EisbukAvatar from "../../components/users/EisbukAvatar";
import ConfirmDialog from "../global/ConfirmDialog";

export const CustomerList = ({
  customers,
  onDeleteCustomer,
  updateCustomer,
}) => {
  const [searchString, setSearchString] = useState("");
  const [customerCurrentlyEdited, setCustomerCurrentlyEdited] = useState(null);
  const [customerCurrentlyDeleted, setCustomerCurrentlyDeleted] = useState(
    null
  );
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const searchRe = new RegExp(searchString, "i");
  const customersToShow = customers.filter(
    (el) => searchRe.test(el.name) || searchRe.test(el.surname)
  );
  const history = useHistory();

  return (
    <>
      <SearchField setSearchString={setSearchString}></SearchField>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Cognome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customersToShow.map((customer) => {
              const deleteButton = onDeleteCustomer ? (
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => {
                    setConfirmDeleteDialog(true);
                    setCustomerCurrentlyDeleted(customer);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : null;
              const editButton = updateCustomer ? (
                <IconButton
                  aria-label="update"
                  color="primary"
                  onClick={() => setCustomerCurrentlyEdited(customer)}
                >
                  <EditIcon />
                </IconButton>
              ) : null;
              const bookingsButton = customer.secret_key && (
                <IconButton
                  color="primary"
                  href={`/clienti/${customer.secret_key}`}
                  onClick={(e) =>
                    e.preventDefault() ||
                    history.push(`/clienti/${customer.secret_key}`)
                  }
                >
                  <DateRangeIcon />
                </IconButton>
              );
              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Box display="flex" flexDirection="row">
                      {deleteButton}
                      {editButton}
                      {bookingsButton}
                      <EisbukAvatar {...customer} />
                    </Box>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.surname}</TableCell>
                  <TableCell>{customer.category}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomerForm
        open={Boolean(customerCurrentlyEdited)}
        handleClose={() => setCustomerCurrentlyEdited(null)}
        customer={customerCurrentlyEdited}
        updateCustomer={updateCustomer}
      />
      {customerCurrentlyDeleted && (
        <ConfirmDialog
          title={
            "Sei sicuro di voler rimuovere " +
            customerCurrentlyDeleted.name +
            " " +
            customerCurrentlyDeleted.surname
          }
          open={confirmDeleteDialog}
          setOpen={setConfirmDeleteDialog}
          onConfirm={() => onDeleteCustomer(customerCurrentlyDeleted)}
        >
          Questa azione non è reversibile, l'utente verrà cancellato
          definitivamente.
        </ConfirmDialog>
      )}
    </>
  );
};

const SearchField = ({ setSearchString }) => {
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  return <TextField label="Search" type="search" onChange={handleChange} />;
};

export default CustomerList;
