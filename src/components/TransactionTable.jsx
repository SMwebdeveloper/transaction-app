import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { MdDelete, MdEdit } from "react-icons/md";
import CurrencyConverter from "./CurrensyConverter";
import moment from "moment/moment";

const TransactionTable = ({ handleDeleteModal, handleEdit, data }) => {
  return (
    <>
      <Table responsive className="w-80 mx-auto mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Price</th>
            <th>Category</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="w-100">
          {data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {
                  <CurrencyConverter
                    amount={item.price}
                    currency={item.currency}
                  />
                }
              </td>
              <td>
                {item.category} {item.costType && <span>/{item.costType}</span>}
              </td>
              {/* <td>{moment(item.date).format("DD/MM/YYYY")}</td> */}
              <td>{item.date}</td>
              <td>
                <Button
                  variant="outline-danger"
                  className="p-1 me-2"
                  onClick={() => handleDeleteModal(item.id)}
                >
                  <MdDelete size={22} />
                </Button>
                <Button
                  variant="outline-warning"
                  className="p-1"
                  onClick={() => handleEdit(item.id)}
                >
                  <MdEdit size={22} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TransactionTable;
