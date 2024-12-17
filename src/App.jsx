import AddTransactionSidebar from "./components/AddTransactionSidebar";
import { useEffect, useState } from "react";
import NavbarComp from "./components/Navbar";
import Container from "react-bootstrap/Container";
import TransactionTable from "./components/TransactionTable";
import { Button, Form } from "react-bootstrap";
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
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./store/reducer/loadingSlice";
import Loader from "./components/Loader";
import TransactionAllTable from "./components/TransactionAllTable";
import Charts from "./components/Charts";
import { fetchCurrency } from "./reusebale/fetchCurrency";
import { convertTransactionsToUSD } from "./reusebale/AllPrice";
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
  const [categories, setCategories] = useState(["Cost", "Benefit", "Demage"]);

  // store
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const isToast = useSelector((state) => state.toast.isToast);
  const toastText = useSelector((state) => state.toast.toastText);

  // get transaction
  const getTransaction = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transaction"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(docs);
      setTransactions(docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setGetLoading(false);
    }
  };

  const filterTransactionsByCategory = async (category) => {
    if (!category) return; // Agar category tanlanmagan bo'lsa, hech narsa qilmaslik

    if (category !== "all") {
      try {
        const q = query(
          collection(db, "transaction"), // Firestore kolleksiyasidan
          where("purpose", "==", category) // category bo'yicha filtrlash
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
      getTransaction();
    }
  };
  // change category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };
  useEffect(() => {
    getTransaction();
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
  }, [transactions]);

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
          <Form className="d-flex align-items-center gap-2 justify-content-center">
            <Form.Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              aria-label="Select category"
            >
              <option value="all">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>{" "}
            <Button
              className="w-auto"
              variant="primary"
              onClick={() => filterTransactionsByCategory(selectedCategory)}
            >
              Filtered
            </Button>
          </Form>
          <Button
            variant="outline-primary"
            onClick={() => setShowAddTransaction(true)}
          >
            Add transaction
          </Button>
        </div>

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
