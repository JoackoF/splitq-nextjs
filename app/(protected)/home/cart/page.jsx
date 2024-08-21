import { getUserCart } from "@/actions/getUserCart";
import IconBox from "@/components/ui/IconBox";
import Link from "next/link";
import { MdAdd, MdOutlineArrowBack, MdOutlineLocalOffer, MdRemove } from "react-icons/md";
import CartProductCard from "./components/CartProductCard";
import CartProductButton from "./components/CartProductButton";
import { multiplyDecimal, sumDecimal } from "@/lib/decimal";
import NoProducts from "./components/NoProducts";


export default async function CartPage() {
    const products = await getUserCart()
    let productPrices = 0

    let total = 0
    if (products.length) {
        productPrices = products.filter(item=> item.enableToBuy).map(item => multiplyDecimal(item.quantity, item.product.price))
        total = sumDecimal(...productPrices)
    }

    const noProducts = !products.some(product => product.enableToBuy)

    return (
        <>
            <div className="p-4">
                <div className="flex gap-4 items-center">
                    <Link href={"/home"}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </Link>
                </div>
                <h1 className="mt-4 font-bold text-3xl">Carrito de compras</h1>
            </div>
            <div className="flex flex-col mb-28">
                {
                    products.length ? products.map(product => <CartProductCard item={product} key={product.id} />) : <NoProducts />
                }
            </div>
            <CartProductButton
                noProducts={noProducts}
                total={total}
            />
        </>
    )
}