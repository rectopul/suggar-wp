import { useInfos } from "../../provider/InfosProvider"

export function Middle() {
    const { infos } = useInfos()

    return (
        <div className="w-full px-2 py-[20px] xl:py-[60px]">
            <div className="w-full max-w-[1300px] mx-auto overflow-hidden flex justify-center items-center max-h-[400px]">
                {infos && infos.media_middle && (
                    <video autoPlay muted loop>
                        <source src={infos.media_middle} type="video/mp4" />
                        Seu navegador não suporta a tag de vídeo.
                    </video>
                )}
            </div>
        </div>
    )
}