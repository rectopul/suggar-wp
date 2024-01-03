import { useEffect, useState } from "react"
import { WooPaymentGatewayList } from "../../@types/Payment"
import { listAllPaymentGateways } from "../../util/Api"

interface SelectedPayment {
    payment_method_title: string
    payment_method: string
}

interface PaymentMethodProps {
    onSelectRadio: (data: SelectedPayment) => void
}

export default function PaymentMethod({ onSelectRadio }: PaymentMethodProps) {
    const [gateways, setGateways] = useState<WooPaymentGatewayList[] | null>(null)
    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

    const gatewaysList = async () => {
        try {
            const list = await listAllPaymentGateways()
            const listActive = list.filter(i => i.enabled === true)
            setGateways(listActive)

            if (listActive.length > 0) {
                setSelectedGateway(listActive[0].id);
            }
        } catch (error) {
            console.log(`Erro ao listar gateways de pagamento`)
        }
    }

    const handleRadioChange = (value: SelectedPayment) => {
        setSelectedGateway(value.payment_method);
        onSelectRadio(value)
    };

    useEffect(() => {
        gatewaysList()
    }, [])

    return (
        <>
            {gateways && gateways.map((g, k) => (
                <div key={k} className="w-full my-1 flex border border-slate-400 rounded-lg p-3">
                    <input 
                        type="radio" 
                        checked={selectedGateway === g.id} 
                        name="payment_method" 
                        value={g.id} 
                        className="w-[20px] h-[20px] rounded-full outline-none border border-slate-400" 
                        onChange={() => handleRadioChange({ payment_method: g.id, payment_method_title: g.method_title})}
                    />
        
                    <span className="text-sm font-semibold text-slate-800 ml-2">{g.title}</span>
                </div>
            ))}
        </>
        
    )
}