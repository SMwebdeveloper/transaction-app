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

function DeleteModal({ idOrShow, close, deleteFn }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isToast = useSelector((state) => state.toast.isToast);

  return (
    <>
      <Modal show={idOrShow} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete the transaction?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="ouline-secondary" onClick={close}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={() => deleteFn(idOrShow)}>
            {isLoading ? "Loading" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
