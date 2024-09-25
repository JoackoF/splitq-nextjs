import ActionItem from "@/components/ActionItem";
import BackButton from "@/components/buttons/BackButton";
import { multiplyDecimal, sumDecimal } from "@/lib/decimal";
import showEsDate from "@/lib/showEsDate";

export function HistoryUser({ history, href = null }) {
    return (<main>
        <div className="p-4">
            <BackButton href={href} />
            <h1 className="font-bold my-4 text-2xl">Historial de Acciones</h1>
            {history.map((day, i) => (
                <div key={i} className="border border-border mb-4 rounded-md bg-foreground">
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:items-center">
                        <p className="font-bold px-4 pb-0 text-text-secundary capitalize text-lg">
                            {showEsDate(day.date, false)}
                        </p>
                        <div className="flex px-4  flex-col sm:flex-row gap-2">
                            <p className="font-bold ">Dinero Gastado: <span className="text-red-500">${day.actions.filter(action => action.type == "purchase").reduce((total, action) => (total + multiplyDecimal(action.value.price, action.quantity)), 0)}</span></p>
                            <p className="font-bold">Saldo recibido: <span className="text-green-500">${day.actions.filter(action => action.type == "recharge").reduce((total, action) => (sumDecimal(action.value,total)), 0)}</span></p>
                        </div>
                    </div>
                    {day.actions.map((action,i) => (
                        <ActionItem key={"action-"+i} action={action} />
                    ))}
                </div>
            ))}
        </div>

    </main>)
}