import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NavbarComp = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-center py-3">
        <Form inline>
          <Row>
            <Col xs="auto">
              <h2 className="h4">Transactions</h2>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </>
  );
};

export default NavbarComp;
