import { useEffect } from "react"
import { Link, useParams, useLocation, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, Form, Button, Card } from "react-bootstrap"
import { addToCart } from "../actions/cartAction"
import Message from "../components/Message"

const CartScreen = () => {
  const { id: productId } = useParams()
  const location = useLocation()

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  const { cartItems } = useSelector(state => state.cart)

  console.log(cartItems)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <div>Cart</div>
}

export default CartScreen
