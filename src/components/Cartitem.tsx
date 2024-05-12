import { Button, Stack } from "react-bootstrap"
import { useShoppinCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
type CartItemProps = {
    id: number
    quantity: number
}


export function CartItem ({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppinCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
            <div className="me-auto">
                <div>
                    {item.name} {quantity > 1 && (
                    <span className="text-muted" style={{ fontSize: ".45rem" }}>X{quantity}</span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".55rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div className="ms-auto d-flex align-items-center">
                <div className="me-1">{formatCurrency(item.price * quantity)}</div>
                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                    &times;
                </Button>
            </div>
        </Stack>
    )
}