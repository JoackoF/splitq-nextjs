"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CartProductButton = ({ total }) => {
  const router =useRouter();
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <div className="justify-between flex">
        <p className="font-bold text-2xl">Total: </p>
        <p className="font-bold text-2xl text-gradient bg-gradient-principal">
          ${total}
        </p>
      </div>
      <Button onClick={()=> router.push("/home/checkout")} disabled={!total} className="w-full">Comprar</Button>
    </div>
  );
};

export default CartProductButton;
