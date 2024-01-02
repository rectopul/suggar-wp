import { useInfos } from "../provider/InfosProvider"
import { sendNewsLetter } from "../util/Api"
import { useForm } from "react-hook-form"

interface newsPayloadTypes {
    email: string
}

export default function Footer() {
    const { infos, media } = useInfos()
    const { register, handleSubmit, formState: {errors} } = useForm<newsPayloadTypes>()
    const onSubmit = async (data: newsPayloadTypes) => {
        try {
            await sendNewsLetter(data.email)

        } catch (error) {
            console.log(`erro ao enviar e-mail`)
        }
        console.log(`dados do form`, data)
    }

    return (
        <div className="w-full bg-lime-green">
            <div className="w-full md:w-[1400px] mx-auto px-5 py-10 md:flex-row flex-col flex text-white">
                <div className="w-full md:w-1/4 flex-col px-3 mb-4 md:mb-0">
                    <figure className="mt-[-20px]">
                        <img src={media?.media_details.sizes.thumbnail.source_url} width={115} alt="..." />
                    </figure>
                    <h3 className="mb-2 font-semibold">Atendimento ao cliente</h3>
                    <p>{infos?.contact_mail}</p>
                </div>

                <div className="w-full md:w-1/4 flex-col px-3 mb-10 md:mb-0">
                    <h3 className="mb-2 font-semibold">Informações Legais</h3>
                    <p className="text-sm mt-3 w-40">Razão social: {infos?.corporate_reason}</p>
                    <p className="text-sm mt-3">CEP: {infos?.cep}</p>
                </div>

                <div className="w-full md:w-1/4 flex-col px-3 mb-10 md:mb-0">
                    <h3 className="mb-2 font-semibold">Links Rápidos</h3>

                    <ul>
                        {infos?.menus.footer.length && infos.menus.footer.map((i, k) => (
                            <li key={k}><a href={i.url} className="hover:text-emerald-400">{i.title}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="w-full md:w-1/4 flex-col px-3 mb-10 md:mb-0">
                    <h3 className="mb-2 font-semibold">Newsletter</h3>

                    <small>Assine nossa newsletter</small> 

                    <div className="w-full flex mt-3 flex-col">
                        {errors.email && (
                            <div className="w-full bg-red-300 p-2 mb-2 rounded mx-auto text-xs">Por favor preencha o formulário</div>
                        )}

                        <form className="flex items-center justify-between" onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                className="rounded bg-white outline-none text-lime-green px-3 py-2 w-[70%] text-xs h-10"
                                type="text" 
                                id="email" 
                                placeholder="Informe seu e-mail"
                                {...register('email', { required: true })}
                            />

                            <button className="w-2/7 ml-2 h-10 text-sm hover:bg-heading hover:text-white text-lime-green bg-white rounded px-5 py-2">Assinar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}