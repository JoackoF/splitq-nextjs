"use client";
import { multiplyDecimal } from "@/lib/decimal";
import { MdOutlineLocalOffer, MdTaskAlt } from "react-icons/md";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { buyProducts } from "@/actions/buyProducts";
import Loader from "@/components/Loader";
import Link from "next/link";
import AlertWarning from "@/components/ui/AlertWarning";
import BackButton from "@/components/buttons/BackButton";
import IconBox from "@/components/ui/IconBox";
export default function Checkout({ checkoutData }) {
  const [loading, startBuying] = useTransition();
  const [error, setError] = useState(false);
  const [success, setSucess] = useState();
  const confirmPay = () => {
    startBuying(async () => {
      const result = await buyProducts(checkoutData);
      if (result?.error) {
        console.log(result);
        setError(result);
        return;
      }
      setSucess(true);
    });
  };

  if (success) {
    return (
      <>
        <BackButton href="/home" />
        <div className="gap-4 bg-foreground border-border mt-4 border rounded-md flex flex-col items-center justify-center p-4 text-center">
          <IconBox
            Icon={MdTaskAlt}
            size={32}
            variant={"square"}
            className="h-14 !w-14 !rounded-full"
          />
          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Tu compra a sido exitosa</h1>
            <p className="text-text-secundary text-sm">
              Ahora puedes canjear tus tickets en los puestos de venta!
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href={"/home/tickets"}>Ir a mis tickets</Link>
          </Button>
        </div>
      </>
    );
  }

  if (checkoutData?.error) {
    return (
      <>
      <BackButton href="/home" />
      <p className="mt-4">No hay productos en el carrito ! :c</p>
      </>
    )
  }

  return (
    <>
      <BackButton href="/home/cart" />
      <h1 className="font-bold text-2xl my-4">Pago</h1>
      <h2 className="font-bold text-lg">Detalles de tus productos</h2>
      <div className="border border-border rounded-md mt-2 mb-4">
        {checkoutData.products.map((item) => (
          <CardProduct
            key={item.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
      <h2 className="font-bold text-lg">Detalle del Pago</h2>
      <div className="border font-bold flex flex-col gap-2 border-border rounded-md mt-2 mb-4 p-4">
        <p>Saldo Disponible: ${checkoutData.user_balance}</p>
        <p>Total: ${checkoutData.subTotal}</p>
        <div className="">
          {checkoutData.newBalance >= 0 ? (
            <p className="pt-4 border-t border-border">
              Saldo despues de la compra: ${checkoutData.newBalance}
            </p>
          ) : (
            <AlertWarning
              title={"Advertencia"}
              description={"Saldo insuficiente !"}
            />
          )}
        </div>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full" disabled={!checkoutData.enableToBuy}>
            <span>Confirmar Pago</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Estas seguro de realizar la compra?</DrawerTitle>
            <DrawerDescription>
              Por el momento esta accion no se puede deshacer.
            </DrawerDescription>
            <div className="!text-start">
              {error && error.error == "NO_STOCK_PRODUCT" && (
                <AlertWarning
                  title={"Producto sin stock !"}
                  description={
                    <div>
                      <p>
                        Hay un producto en tu carrito que no tiene stock
                        suficiente
                      </p>
                      <p>
                        <span className="font-bold">Producto</span>:{" "}
                        {error.product_name}
                      </p>
                      <p>
                        <span className="font-bold">Stock Actual</span>:{" "}
                        {error.currentStock}
                      </p>
                      <p>
                        <span className="font-bold">Cantidad a comprar</span>:{" "}
                        {error.quantity}
                      </p>
                    </div>
                  }
                />
              )}
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              disabled={!checkoutData.enableToBuy || loading}
              onClick={confirmPay}
            >
              {loading ? <Loader /> : "Estoy seguro de comprar"}
            </Button>
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const CardProduct = ({ product, quantity }) => {
  return (
    <div className="border-b last:border-none flex p-2 gap-2 border-border w-full">
      {product?.images && product?.images.length ? (
        <img
          className="max-h-16 aspect-square object-contain rounded border border-border"
          src={product.images[0].url}
        />
      ) : (
        <div className="h-16 aspect-square border border-border flex items-center justify-center">
          <MdOutlineLocalOffer size={30} />
        </div>
      )}
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <p className="text-xs text-text-secundary">{product.seller.name}</p>
          <div className="my-2">
            <p className="text-xs">Cantidad | {quantity}</p>
            <p className="text-xs">Precio individual | ${product.price}</p>
          </div>

          <p className="font-bold text-lg text-gradient bg-gradient-principal">
            ${multiplyDecimal(product.price, quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};
