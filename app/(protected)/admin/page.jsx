import { Logo } from "@/components/Logo";
import IconBox from "@/components/ui/IconBox";
import { authUser } from "@/lib/authUser";
import { Settings } from "lucide-react";
import { MdOutline10K, MdOutlineComputer, MdOutlineHardware, MdOutlineSettings, MdOutlineStorefront, MdOutlineVerifiedUser } from "react-icons/md";
import HeaderAdmin from "./headerAdmin";
import Link from "next/link";


export default async function Home() {
    const user = await authUser();

    return (
        <div>
            {/* <p>Home Admin ! {user.name}</p> */}
            <div className="flex justify-between items-center p-4">
                {/* <Logo
                    width={150}
                /> */}
                <h1 className="text-3xl font-bold">Bienvenido al panel de administracion</h1>
                {/* <IconBox
                    Icon={MdOutlineSettings}
                /> */}
                <HeaderAdmin />
            </div>

            <div>
                <p className="text-xl font-bold text-text-secundary p-4">Perfiles</p>
                <div>
                    <Link href={"/admin/createProfile"}>
                        <ActionLayout
                            description={"Crear Perfil"}
                        >
                            <IconBox
                                Icon={MdOutlineStorefront}
                            />
                        </ActionLayout>
                    </Link>

                    <Link href={"/admin/manageProfile"}>
                        <ActionLayout
                            description={"Administrar Perfiles"}
                        >
                            <IconBox
                                Icon={MdOutlineStorefront}
                            />
                        </ActionLayout>
                    </Link>

                </div>
            </div>

            <div className="mt-4">
                <p className="text-xl font-bold text-text-secundary p-4">Categoria</p>
                <div>
                    <Link href={"/admin/createCategories"}>
                        <ActionLayout
                            description={"Crear Categoria"}
                        >
                            <IconBox
                                Icon={MdOutlineStorefront}
                            />
                        </ActionLayout>
                    </Link>
                    <Link href={"/admin/manageCategories"}>
                        <ActionLayout
                            description={"Administrar Categorias"}
                        >
                            <IconBox
                                Icon={MdOutlineStorefront}
                            />
                        </ActionLayout>
                    </Link>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-xl font-bold text-text-secundary p-4">SplitPay</p>
                <div>
                    <Link href={"/admin/splitpay"}>
                        <ActionLayout
                            description={"Administrar Dispositivos SplitPay"}
                        >
                            <IconBox
                                Icon={MdOutlineComputer}
                            />
                        </ActionLayout>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const ActionLayout = ({ children, description }) => {
    return (
        <section className="flex items-center first:border-t gap-3 p-4 border-b border-border">
            {children}
            <p className="text-md font-bold">{description}</p>
        </section>
    )
} 