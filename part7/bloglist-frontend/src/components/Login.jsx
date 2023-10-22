import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = ({ target }) => {
        setUsername(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setUsername('')
        setPassword('')
        dispatch(userLogin(username, password))
    }

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3">
                                <h2 className="fw-bold mb-2 text-uppercase ">
                                    Login
                                </h2>
                                <div className="mb-3">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formUsername"
                                        >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={handleUsernameChange}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formPassword"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Log in
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
