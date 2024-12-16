import AddTransactionSidebar from "./components/AddTransactionSidebar";
import { useEffect, useState } from "react";
import NavbarComp from "./components/Navbar";
import Container from "react-bootstrap/Container";
import TransactionTable from "./components/TransactionTable";
import { Button, Form } from "react-bootstrap";
import EditTransactionSidebar from "./components/EditTransactionSidebar";
import DeleteModal from "./components/DeleteModal";
import ToastComponent from "./components/ToastComponent";

import { db } from "./firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./store/reducer/loadingSlice";
import Loader from "./components/Loader";
import {
  clearToast,
  setToastText,
  setToastVisibility,
} from "./store/reducer/toastSlice";
function App() {
  // states
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showEditModal, setEditModal] = useState(null);
  const [deleteTransactionId, setDeleteTransactionId] = useState("");
  const [getLoading, setGetLoading] = useState(true);

  // store
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isToast = useSelector((state) => state.toast.isToast);
  const toastText = useSelector((state) => state.toast.toastText);

  // add transaction

  // get transaction
  const getTransaction = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transaction"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log();
      setTransactions(docs); // Olingan ma'lumotlarni state'ga saqlash
      console.log(docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setGetLoading(false);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  if (getLoading) return <Loader />;
  return (
    <>
      <NavbarComp />
      <AddTransactionSidebar
        show={showAddTransaction}
        close={() => setShowAddTransaction(false)}
      />
      <EditTransactionSidebar
        show={showEditModal}
        close={() => setEditModal(null)}
      />
      <DeleteModal
        show={deleteTransactionId}
        close={() => setDeleteTransactionId(null)}
      />
      <ToastComponent />
      <Container className="py-5">
        <div className="d-flex align-items-center gap-4 justify-content-end">
          <Form className="d-flex align-items-center gap-2 justify-content-center">
            <Form.Group>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group>
              <Form.Control type="date" />
            </Form.Group>
            <Button>Filtered date</Button>
          </Form>
          <Button
            variant="outline-primary"
            onClick={() => setShowAddTransaction(true)}
          >
            Add transaction
          </Button>
        </div>

        {transactions && (
          <TransactionTable
            data={transactions}
            handleDeleteModal={(e) => {
              setDeleteTransactionId(e);
            }}
            handleEdit={(id) => setEditModal(id)}
          />
        )}
      </Container>
    </>
  );
}

export default App;
