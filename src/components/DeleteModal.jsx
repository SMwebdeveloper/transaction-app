import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/reducer/loadingSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  clearToast,
  setToastText,
  setToastVisibility,
} from "../store/reducer/toastSlice";

function DeleteModal({ show, close, id }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isToast = useSelector((state) => state.toast.isToast);

  const deleteTransaction = async () => {
    dispatch(setLoading(true));
    try {
      const docRef = doc(db, "transaction", show);
      await deleteDoc(docRef);
      dispatch(setToastVisibility(true));
      dispatch(setToastText("Transaction deleted"));
    } catch (error) {
      dispatch(setToastVisibility(true));
      dispatch(setToastText("Upps error"));
    } finally {
      dispatch(setLoading(false));
      close();
      setInterval(() => {
        dispatch(clearToast());
      }, 3000);
    }
  };
  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete the transaction?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="ouline-secondary" onClick={close}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={deleteTransaction}>
            {isLoading ? "Loading" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
