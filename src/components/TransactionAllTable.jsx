import { Table } from "react-bootstrap";

const TransactionAllTable = ({ transactions }) => {
  return (
    <>
      <Table responsive className="w-80 mx-auto mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Category name</th>
            <th>All Price</th>
          </tr>
        </thead>
        <tbody className="w-100">
          {transactions.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.category}</td>
              <td>{item.totalInUSD}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TransactionAllTable;
