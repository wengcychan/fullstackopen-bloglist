import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Container } from 'react-bootstrap'

const Navigation = () => (
  <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Container>
        <Nav>
          <Nav.Link href="#" as="span">
            <Link to="/" className="text-decoration-none text-white">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" className="text-decoration-none text-white">
              Users
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar.Collapse>
  </Navbar>
)

export default Navigation
