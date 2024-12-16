import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { MdDelete, MdEdit } from "react-icons/md";

const TransactionTable = ({ handleDeleteModal, handleEdit, data }) => {
  const generateDate = (date) => {
    const newDate = new Date(date * 1000);
    return newDate.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Table responsive className="w-80 mx-auto mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Price</th>
            <th>Purpose</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="w-100">
          {data.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {item.price} <span>{item.category}</span>
              </td>
              <td>
                {item.purpose} /{item.costType && <span>{item.costType}</span>}
              </td>
              <td>{generateDate(item.date)}</td>
              <td className="d-flex align-items-center justify-content-center">
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
