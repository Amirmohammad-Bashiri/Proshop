import { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userAction"
import FormContainer from "../components/FormContainer"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const { loading, error, userInfo } = useSelector(state => state.userLogin)

  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const history = useHistory()

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, redirect, history])

  const submitHandler = e => {
    e.preventDefault()

    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
