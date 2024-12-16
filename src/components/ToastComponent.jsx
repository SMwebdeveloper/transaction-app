import React from "react";
import { ToastContainer } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../store/reducer/toastSlice";

const ToastComponent = () => {
  const dispatch = useDispatch();
  const isToast = useSelector((state) => state.toast.isToast);
  const toastText = useSelector((state) => state.toast.toastText);
  return (
    <>
      <ToastContainer position="bottom-end" className="mb-4 mx-4">
        <Toast show={isToast} onClose={dispatch(clearToast())}>
          <Toast.Header></Toast.Header>
          <Toast.Body>
            <h4 className="h5 mx-auto">{toastText}</h4>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ToastComponent;
