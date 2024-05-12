import { useContext, createContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Määritellään tyypit komponentin propsille, joka ottaa lapsikomponentit
type ShoppingCartProviderProps = {
    children: ReactNode
}

// Määritellään ostoskorin tuotteen tyyppin
type CartItem = {
    id: number
    quantity: number
}

// Ostoskorin kontekstin tyyppi, sisältää toiminnot ja muuttujat
type ShoppingCartContext = {
    openCart: ()=> void
    closeCart: ()=> void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

// Luo kontekstin ostoskorille, alustetaan tyhjällä objektilla
const ShoppingCartContext = createContext({} as
    ShoppingCartContext
)

// Custom hook ostoskorin kontekstin käyttämiseen
export function useShoppinCart() {
    return useContext(ShoppingCartContext)
}

// Provider-komponentti, joka mahdollistaa ostoskorin toimintojen käyttämisen ja tilan jakamisen
export function ShoppingCartProvider({ children }:
    ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false) // Tila, joka kertoo onko ostoskori avoinna
    const [cartItems, setCartItmes] = useLocalStorage<CartItem[]>("shoppingcart",[])

     // Laskee yhteen ostoskorin tuotteiden määrät
    const cartQuantity = cartItems.reduce((quantity, item)=>
    item.quantity + quantity, 0)
    const openCart = ()=> setIsOpen(true)  // Avaa ostoskorin asettamalla isOpen-tilan todeksi
    const closeCart = ()=> setIsOpen(false) // Sulkee ostoskorin asettamalla isOpen-tilan epätodeksi

    // Hakee tietyn tuotteen määrän ostoskorissa
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
     // Lisää tuotteen määrää ostoskorissa
    function increaseCartQuantity(id: number) {
        setCartItmes(currItems => {
            //etsii onko tuote jo ostoskorissa
            if (currItems.find(item => item.id === id) == null) {
                //jos tuotetta ei ole lisää uuden tuotteen
                return [...currItems, { id, quantity: 1 }]
            } else {
                //jos tuote on ostoskorissa käy läpi ostoskorin tuotteet
                return currItems.map(item => {
                    if (item.id === id) {
                        //jos tuote on sama mitä on jo yksi ostoskorissa lisää toinen
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        //jos ei ole oikea tuote ei muuta ostoskoria
                        return item
                    }
                })
            }
        })
    }
    // Vähentää tuotteen määrää ostoskorissa tai poistaa sen kokonaan, jos määrä on 1
    function decreaseCartQuantity(id: number) {
        setCartItmes(currItems => {
            //etsii onko tuote jo ostoskorissa
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                //jos tuotetta ei ole poistaa uuden tuotteen
                return currItems.filter(itme => itme.id !== id)
            } else {
                //jos tuote on ostoskorissa käy läpi ostoskorin tuotteet
                return currItems.map(item => {
                    if (item.id === id) {
                        //jos tuote on sama mitä on jo yksi ostoskorissa poista toinen
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        //jos ei ole oikea tuote ei muuta ostoskoria
                        return item
                    }
                })
            }
        })
    }
    // Poistaa tuotteen ostoskorista
    function removeFromCart(id: number) {
        setCartItmes(currItems => {
            return currItems.filter(item => item.id !== id)
    })
}

// Palautetaan kontekstin tarjoaja, joka mahdollistaa tilan ja toimintojen jakamise
return (
    <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart,cartItems, cartQuantity, openCart,closeCart }}>
        {children}
        <ShoppingCart  isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
)
}