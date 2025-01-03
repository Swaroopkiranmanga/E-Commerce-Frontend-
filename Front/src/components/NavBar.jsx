import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Container, Form, Button, Nav, NavDropdown } from 'react-bootstrap';

function NavBar() {
  const navigate = useNavigate(); 
  const need = ()=>{
    navigate ("/");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top" bg="primary">
      <Container fluid className="px-3">
        <Navbar.Brand href="#" className="d-flex align-items-center" style={{ paddingLeft: '100px' }}>
          <span onClick={need}>Needs for you👋</span>
          <Form className="d-flex ms-4" style={{ width: 'auto' }}>
            <Form.Control
              type="search"
              placeholder="Search for Products"
              className="me-2"
              aria-label="Search"
              style={{ width: '500px', height: '45px' }} 
            />
            <Button variant="outline-success" style={{ height: '45px' }}>
              Search
            </Button>
          </Form>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 d-flex align-items-center" navbarScroll>
            <NavDropdown title={<><FaUser className="me-2" />Login</>} id="navbarScrollingDropdown" className="mx-2">
              {/* Add navigation to Login */}
              <NavDropdown.Item onClick={() => navigate("/login")}>
                New Customer Sign Up
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">Orders</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Wishlist</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#action7" className="d-flex align-items-center">
              <FaShoppingCart className="me-2" />
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;