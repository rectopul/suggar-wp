import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createOrder, getAddredd } from "../../util/Api";
import { useInfos } from "../../provider/InfosProvider";
import { OrderPayloadTypes, ShippintTheTypes } from "../../util/types";
import { Resume } from "../Checkout/Resume";
import InputMask from 'react-input-mask';
import { Pix } from "../../assets/Icons";
import PaymentMethod from "./PaymentMethod";

interface PaymentMethodProperties {
    payment_method_title: string
    payment_method: string
}

export function Shipping() {
    const defaultMethod = {
        payment_method_title: "Pix",
        payment_method: "wc_piggly_pix_gateway"
    }

    const { cart } = useInfos()
    const [mthodPayment, setMethodPayment] = useState<PaymentMethodProperties | null>()
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<ShippintTheTypes>();
    const formRef = useRef<HTMLFormElement>(null)


    const onSubmit = async () => { 
        try {
            
            const products_order = cart?.items.map(i => {
                return {
                    product_id: i.id,
                    quantity: i.quantity
                }
            })
            const shipping: ShippintTheTypes = getValues()

            const discount = {
                coupon_lines: [
                    {
                        code: "PAG-PIX",
                        discount: "15"
                }
            ]
            }
            
            if(products_order) {

                if(mthodPayment) {
                    const infosOrder: OrderPayloadTypes  = {
                        line_items: products_order,
                        payment_method_title: mthodPayment.payment_method_title,
                        payment_method: mthodPayment.payment_method,
                        set_paid: false,
                        shipping,
                        billing: shipping,
                        shipping_lines: [{
                            method_id: 'flat_rate',
                            method_title: 'Frete Grátis',
                            total: '0'
                        }]
                    }

                    if(infosOrder.payment_method == "wc_piggly_pix_gateway") {
                        const theOrder = {coupon_lines: discount.coupon_lines, ...infosOrder}
                        const order = await createOrder({data: {...theOrder}})
                        window.location.href = order.payment_url
                    }else{
                        const order = await createOrder({data: {...infosOrder}})
                        window.location.href = order.payment_url
                    }

                    
                }else{
                    const infosOrder: OrderPayloadTypes  = {
                        line_items: products_order,
                        payment_method_title: defaultMethod.payment_method_title,
                        payment_method: defaultMethod.payment_method,
                        set_paid: false,
                        shipping,
                        billing: shipping,
                        shipping_lines: [{
                            method_id: 'flat_rate',
                            method_title: 'Frete Grátis',
                            total: '0'
                        }]
                    }

                    const theOrder = {coupon_lines: discount.coupon_lines, ...infosOrder}
                    const order = await createOrder({data: {...theOrder}})
    
                    window.location.href = order.payment_url
                }

                
            }


        } catch (error) {
            console.log(`erro ao criar ordem`)
        }
        
    };

    const watch_cep = watch("postcode")

    const getAddres = async () => {
        try {
            if(watch_cep.length == 9) {
                const address = await getAddredd(watch_cep)
                setValue('address_1', address.logradouro)
                setValue('address_2', address.bairro)
                setValue('city', address.localidade)
                setValue('state', address.uf)
                setValue('country', 'Brasil')
            }
        } catch (error) {
            console.log(`Erro ao pegar endereço`)
        }
    }

    useEffect(() => {
        getAddres()
    }, [watch_cep])
    
    return (
        <div className="w-full">
            <div className="w-full md:w-[1400px] mx-auto flex flex-col my-4">

                <div className="flex flex-col md:flex-row flex-nowrap w-full">

                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="md:w-3/5 self-start w-full border-gray-200 border bg-white p-5 rounded-xl flex flex-col my-3">
                        <div className="mr-2 md:mr-0 border-b border-gray-200 pb-6">
                            <h3 className="font-medium text-lime-green my-3">Informações pessoais</h3>

                            <div className="w-full flex">
                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Nome</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="Nome" 
                                        {...register("first_name", { required: true })}
                                    />
                                    {errors.first_name && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe seu nome</p>)}
                                </div>

                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Sobrenome</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="Sobrenome" 
                                        {...register("last_name", { required: true })}
                                    />
                                    {errors.last_name && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe sobre nome</p>)}
                                </div>
                            </div>

                            <div className="w-full flex mt-4">
                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">E-mail</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="E-mail" 
                                        {...register("email", {required: true})}
                                    />
                                    {errors.email && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe seu e-mail</p>)}
                                </div>

                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Telefone</label>
                                    <InputMask 
                                        mask="(99) 99999-9999"
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal"
                                        type="text"
                                        placeholder="Telefone"
                                        {...register("phone", { required: true })}
                                    />
                                    {errors.phone && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe Telefone</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="mr-2 md:mr-0 pt-6">
                            <h3 className="font-medium text-lime-green my-3">Informações de entrega e faturamento</h3>

                            <div className="w-full flex mt-4">
                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">CEP</label>
                                    <InputMask 
                                        mask="99999-999"
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal"
                                        type="text"
                                        placeholder="Informe o cep da sua rua"
                                        {...register("postcode", { required: true })}
                                    />
                                    {errors.postcode && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe seu cep</p>)}
                                </div>

                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Endereço</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="Endereço" 
                                        {...register("address_1", { required: true })}
                                    />
                                    {errors.address_1 && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Seu endereço</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="mr-2 md:mr-0">
                            <div className="w-full flex mt-4">
                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Bairro</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="Bairro" 
                                        {...register("address_2", { required: true })}
                                    />
                                    {errors.address_2 && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe Bairro</p>)}
                                </div>

                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Cidade</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="Cidade" 
                                        {...register("city", { required: true })}
                                    />
                                    {errors.address_1 && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Sua cidade</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="mr-2 md:mr-0 mb-5">
                            <div className="w-full flex mt-4">
                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">Estado</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="Estado" 
                                        {...register("state", { required: true })}
                                    />
                                    {errors.state && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe seu estado</p>)}
                                </div>

                                <div className="w-1/2 flex flex-col mr-0 md:mr-2">
                                    <label className="text-xs font-medium font-lime-green mb-1">País</label>
                                    <input 
                                        className="rounded-lg px-3 border border-gray-300 py-3 outline-none text-gray-400 text-sm font-normal" 
                                        placeholder="País" 
                                        {...register("country", { required: true })}
                                    />
                                    {errors.country && (<p className="p-1 rounded-md mt-2 text-xs font-white bg-red-300 text-center">Informe seu país</p>)}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <h3 className="font-medium text-lime-green my-3">Metodo de pagamento</h3>

                            <div className="flex flex-col w-full mt-4">
                                <div className="w-full flex">
                                    <label htmlFor="payment_type" className="flex text-center font-semibold hover:bg-indigo-500 border-2 border-indigo-500 px-5 w-full text-lg md:text-xl py-8 bg-indigo-300 text-white rounded-3xl"><Pix size={30} className="mr-4" color="#fff" /> Pagamento via PIX </label>
                                    <input type="radio" className="hidden" name="payment_type" value="pix" />
                                </div>
                            </div>

                            <div className="flex flex-col w-full mt-4 p-2">
                                <PaymentMethod onSelectRadio={setMethodPayment} />
                            </div>
                        </div>

                        <button className="w-full mt-4 bg-lime-green text-white text-xl border border-lime-green cursor-pointer font-bold text-center px-3 py-4 mx-auto hover:bg-white hover:text-lime-green rounded-xl">Finalizar compra</button>
                    </form>

                    <Resume />
                </div>
            </div>
        </div>
    )
}