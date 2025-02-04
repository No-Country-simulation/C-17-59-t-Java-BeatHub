/* eslint-disable @next/next/no-img-element */
import { IconShoppingCart } from "@tabler/icons-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { formatNumber } from "@/components/utils/dataFormat";
import { setLocalStorage } from "@/components/utils/handleLocalStorage";
import toast from "react-hot-toast";
import { $ShoppingCart } from "@/stores/beats";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";
import { $IsLogged } from "@/stores/users";
import { useEffect, useState } from "react";

export const ModalShoppingCart = () => {
  const router = useRouter();
  const shoppingCart = useStore($ShoppingCart);
  const isLogged = useStore($IsLogged);
  const total = shoppingCart?.reduce((acc, beat) => acc + beat.precio, 0) || 0;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [clickPagar, setClickPagar] = useState(false);

  const handleDeleteBeat = (beatId: number) => {
    const newShoppingCart = shoppingCart?.filter(
      (beat) => beat.idBeat !== beatId
    );
    if (!newShoppingCart) return;
    $ShoppingCart.set(newShoppingCart);
    setLocalStorage(`localShoppingCart`, newShoppingCart);
    if (newShoppingCart.length === 0) onOpenChange();
  };
  const handleClickCart = () => {
    if (total) {
      onOpen();
    } else {
      toast.error("No hay beats en el carrito");
    }
  };
  useEffect(() => {
    if (clickPagar) {
      setTimeout(() => {
        setClickPagar(false);
      }, 1000);
    }
  }, [clickPagar, onOpenChange]);
  useEffect(() => {
    if (clickPagar && isLogged && total > 0) {
      router.push("/pago");
    } else if (clickPagar && !isLogged) {
      router.push("/login");
    }
  }, [clickPagar, isLogged, total, router]);

  const handlePagar = (e: any) => {
    e.preventDefault();
    onOpenChange();
    setClickPagar(true);
  };
  return (
    <>
      <button
        onClick={handleClickCart}
        className="hover:text-slate-200 duration-100 ease-out"
      >
        <IconShoppingCart stroke={2} size={30} />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Carrito de compras
              </ModalHeader>
              <ModalBody>
                <ul>
                  {shoppingCart?.map((beat) => (
                    <li key={beat.idBeat}>
                      <div className="relative h-[7rem] shadow-md rounded-md flex items-center justify-between p-3">
                        <div className="flex justify-center items-center gap-2">
                          <img
                            src={`https://img.youtube.com/vi/${beat.url}/mqdefault.jpg`}
                            alt={`imagen de ${beat.nombre}`}
                            className="w-[6rem] h-[4rem] object-cover rounded-md"
                          />
                          <span>{beat.nombre}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteBeat(beat.idBeat)}
                          className="absolute top-1 right-1 flex items-center justify-center hover:text-red-500 duration-100 active:scale-90 p-1"
                        >
                          x
                        </button>
                        <span>$ {formatNumber(beat.precio)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>

                <Button
                  type="button"
                  disabled={total ? false : true}
                  color="primary"
                  onClick={(e) => handlePagar(e)}
                >
                  Pagar $ {total && formatNumber(total)}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
