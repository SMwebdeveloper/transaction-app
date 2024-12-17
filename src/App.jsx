import AddTransactionSidebar from "./components/AddTransactionSidebar";
import { useEffect, useState } from "react";
import NavbarComp from "./components/Navbar";
import Container from "react-bootstrap/Container";
import TransactionTable from "./components/TransactionTable";
import { Button, Col, Form, Row } from "react-bootstrap";
import EditTransactionSidebar from "./components/EditTransactionSidebar";
import DeleteModal from "./components/DeleteModal";
import ToastComponent from "./components/ToastComponent";
import { FaChartPie } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";

import { db } from "./firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { setLoading } from "./store/reducer/loadingSlice";
import Loader from "./components/Loader";
import TransactionAllTable from "./components/TransactionAllTable";
import Charts from "./components/Charts";
import { fetchCurrency } from "./reusebale/fetchCurrency";
import { convertTransactionsToUSD } from "./reusebale/AllPrice";
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
  const [visibleTable, setVisibleTable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rates, setRates] = useState({});
  const [transactionsResult, setTransactionsResult] = useState([]);
  const [categories, setCategories] = useState(["Cost", "Benefit", "Damage"]);
  const [allTransactions, setAllTransactions] = useState([]);

  // get transactions
  const getTransactions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transaction"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(docs);
      setAllTransactions(docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setGetLoading(false);
    }
  };

  // add transaction
  const addTransaction = async (data) => {
    dispatch(setLoading(true));
    try {
      await addDoc(collection(db, "transaction"), data);
      dispatch(setToastVisibility(true));
      dispatch(setToastText({ toastText: "Transaction added successfully" }));
      getTransactions();
    } catch (error) {
      console.log(error);
      dispatch(setToastVisibility(true));
      dispatch(setToastText({ toastText: "Upps error" }));
    }
    dispatch(setLoading(false));
    setShowAddTransaction(false);
    setInterval(() => {
      dispatch(clearToast(false));
    }, 3000);
  };

  // delete transaction
  const deleteTransaction = async (id) => {
    dispatch(setLoading(true));
    try {
      const docRef = doc(db, "transaction", id);
      await deleteDoc(docRef);
      dispatch(setToastVisibility(true));
      dispatch(setToastText({ toastText: "Transaction deleted" }));
      getTransactions();
    } catch (error) {
      dispatch(setToastVisibility(true));
      dispatch(setToastText({ toastText: "Upps error" }));
    } finally {
      dispatch(setLoading(false));
      setDeleteTransactionId(null);
      setInterval(() => {
        dispatch(clearToast(false));
      }, 3000);
    }
  };

  // Edit transaction
  const editTransaction = async (data, id) => {
    dispatch(setLoading(true));
    try {
      const docRef = doc(db, "transaction", id); // "transactions" kolleksiyani o'zgartiring
      await updateDoc(docRef, {
        ...data,
      });
      dispatch(setToastVisibility(true));
      dispatch(setToastText({ toastText: "Transaction updated" }));
      getTransactions();
    } catch (error) {
      console.error("Xato yangilashda:", error);
    } finally {
      dispatch(setLoading(false));
      setEditModal(null);
      setInterval(() => {
        dispatch(clearToast(false));
      }, 3000);
    }
  };
  // Transaction filtered by category
  const filterTransactionsByCategory = async (category) => {
    if (!category) return; // Agar category tanlanmagan bo'lsa, hech narsa qilmaslik

    if (category !== "all") {
      try {
        const q = query(
          collection(db, "transaction"), // Firestore kolleksiyasidan
          where("category", "==", category) // category bo'yicha filtrlash
        );
        const querySnapshot = await getDocs(q);
        const transactions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(transactions);
      } catch (error) {
        console.error("Filtrlashda xatolik:", error);
      }
    } else {
      getTransactions();
    }
  };
  // change category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };
  useEffect(() => {
    getTransactions();
  }, []);

  //all transactions result
  const fetchRates = async () => {
    try {
      const currensy = await fetchCurrency();
      setRates(currensy);
    } catch (error) {
      console.error("Valyuta kurslarini olishda xatolik:", error);
    }
  };

  useEffect(() => {
    fetchRates();
    const response = convertTransactionsToUSD(transactions, rates);
    setTransactionsResult(response);
  }, [allTransactions]);

  if (getLoading) return <Loader />;
  return (
    <>
      <NavbarComp />
      <AddTransactionSidebar
        show={showAddTransaction}
        close={() => setShowAddTransaction(false)}
        addFn={(data) => addTransaction(data)}
      />
      <EditTransactionSidebar
        idOrShow={showEditModal}
        close={() => setEditModal(null)}
        editFn={(data, id) => editTransaction(data, id)}
      />
      <DeleteModal
        idOrShow={deleteTransactionId}
        deleteFn={(id) => deleteTransaction(id)}
        close={() => setDeleteTransactionId(null)}
      />
      <ToastComponent />
      <Container className="py-5">
        <Row className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-3 gap-lg-0">
          {/* Left Buttons */}
          <Col xs="auto" className="d-flex gap-2">
            <Button
              variant="light"
              className="p-2 d-flex align-items-center justify-content-center text-primary"
              onClick={() => setVisibleTable(true)}
            >
              <FaTableList />
            </Button>
            <Button
              variant="light"
              className="p-2 d-flex align-items-center justify-content-center text-primary"
              onClick={() => setVisibleTable(false)}
            >
              <FaChartPie />
            </Button>
          </Col>

          {/* Filter Form */}
          <Col xs={12} lg="auto" className="d-flex justify-content-center">
            <Form className="d-flex flex-wrap align-items-center gap-2">
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                aria-label="Select category"
                className="w-auto"
              >
                <option value="all">All</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
              <Button
                className="w-auto"
                variant="primary"
                onClick={() => filterTransactionsByCategory(selectedCategory)}
              >
                Filtered
              </Button>
            </Form>
          </Col>

          {/* Add Transaction Button */}
          <Col xs="auto" className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              onClick={() => setShowAddTransaction(true)}
            >
              Add transaction
            </Button>
          </Col>
        </Row>

        {transactions.length !== 0 ? (
          <>
            {visibleTable ? (
              <>
                <TransactionTable
                  data={transactions}
                  handleDeleteModal={(e) => {
                    setDeleteTransactionId(e);
                  }}
                  handleEdit={(id) => setEditModal(id)}
                />
                <TransactionAllTable transactions={transactionsResult} />
              </>
            ) : (
              <Charts transactions={transactionsResult} />
            )}
          </>
        ) : (
          <h3>Not found transactions</h3>
        )}
      </Container>
    </>
  );
}

export default App;
