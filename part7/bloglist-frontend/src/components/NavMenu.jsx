import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavMenu = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(userLogout())
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/blogs">
                            <Nav.Link>Blogs</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/users">
                            <Nav.Link>Users</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Text className="px-3">{`${user.name} logged in`}</Navbar.Text>
                    <Button variant="danger" onClick={handleLogout}>
                        Log out
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavMenu
