import { useInfos } from "../provider/InfosProvider"

export default function MiniBanner1() {
    const { infos } = useInfos()
    return (
        <div className="w-full my-10">
            <div className="w-full md:max-w-[1400px] mx-auto mt-10 flex-col md:flex-row px-2 md:px-0 flex justify-between">
                {infos && infos.mini_banner_1 && infos.about_excerpt && (
                    <>
                        <figure>
                            <img src={infos.mini_banner_1} alt="..." />
                        </figure>

                        <div className="text-heading flex justify-center flex-col">
                            <h2 className="font-bold mb-3 text-3xl">Pouco De Nós</h2>
                            <p>{infos?.about_excerpt}</p>
                        </div>
                    </>
                )}
                
                
            </div>
        </div>
    )
}