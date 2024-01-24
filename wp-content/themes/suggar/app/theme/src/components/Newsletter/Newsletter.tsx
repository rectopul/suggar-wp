import { useForm } from "react-hook-form"
import { newsPayloadTypes, sendNewsLetter } from "../../util/Api"


export function Newsletter() {
    const { register, handleSubmit } = useForm<newsPayloadTypes>()

    const onSubmit = async (data: newsPayloadTypes) => {
        try {
            await sendNewsLetter(data)

        } catch (error) {
            console.log(`erro ao enviar e-mail`)
        }
        console.log(`dados do form`, data)
    }

    return (
        <div className="w-full px-2 bg-neutral-50">
            <div className="w-full max-w-[1300px] mx-auto h-[129px] py-10  items-center gap-[35px] flex justify-between">
                <div className="xl:w-[272px]">
                    <span className="text-black text-sm font-normal font-pop">
                        Quer receber 
                    </span>
                    
                    <span className="text-black text-sm font-bold font-pop"> cupons de oferta</span>
                    
                    <span className="text-black text-sm font-normal font-pop"> em primeira mão? Cadastre-se! </span>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 relative">
                        <input 
                            className="w-[247px] h-[49px] px-2.5 py-3.5 bg-white border border-stone-300 justify-start items-start gap-2.5 inline-flex text-black text-sm font-normal font-pop placeholder:text-black"
                            type="text" 
                            id="email" 
                            placeholder="nome"
                            {...register('name', { required: true })}
                        />

                        <input 
                            className="w-[247px] h-[49px] px-2.5 py-3.5 bg-white border border-stone-300 justify-start items-start gap-2.5 inline-flex text-black text-sm font-normal font-pop placeholder:text-black"
                            type="text" 
                            id="email" 
                            placeholder="e-mail"
                            {...register('email', { required: true })}
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-5 h-5 bg-white border border-neutral-300"
                                id="private"
                                {...register('private', { required: true })}
                            />
                            <div className="flex flex-col ml-2">
                                <span className="text-black text-sm font-normal font-pop">Li e concordo com as<br/></span>
                                <span className="text-blue-900 text-sm font-bold font-pop">política de privacidade.</span>
                            </div>
                        </div>

                        <button 
                            className="w-[200px] ml-2 h-[49px] text-white px-3.5 bg-black rounded-[5px] gap-2.5 inline-flex justify-center items-center font-pop text-sm font-bold">
                                CADASTRAR
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}