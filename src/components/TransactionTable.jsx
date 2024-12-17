import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { MdDelete, MdEdit } from "react-icons/md";
import CurrencyConverter from "./CurrensyConverter";

const TransactionTable = ({ handleDeleteModal, handleEdit, data }) => {
  return (
    <>
      <Table responsive className="w-sm-100 w-75  mx-auto mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="">
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
              <td className="">
                <Button
                  variant="outline-danger"
                  className="p-1 me-2 block"
                  onClick={() => handleDeleteModal(item.id)}
                >
                  <MdDelete size={22} />
                </Button>
                <Button
                  variant="outline-warning"
                  className="p-1 block"
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
