import { useInfos } from "../provider/InfosProvider"


export default function Footer() {
    const { infos } = useInfos()

    return (
        <div className="w-full bg-blue-900 flex-col justify-start items-center gap-11 inline-flex">
            <div className="w-full md:max-w-[1300px] mx-auto px-5 py-10 flex-col flex text-white">

                <div className="w-full text-center text-white text-xs font-normal font-pop mb-5">
                    {infos && infos.copyright && (
                        <span>{infos.copyright}</span>
                    )}
                </div>

                <div className="w-full flex items-center justify-center">
                    {infos && infos.logos.agencia && infos.logos.empresa && (
                        <>
                            <figure className="mx-1">
                                <img src={infos.logos.empresa} alt="wake" />
                            </figure> 

                            <figure className="mx-1 mt-[-5px]">
                                <img src={infos.logos.agencia} alt="agencia" />
                            </figure>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}