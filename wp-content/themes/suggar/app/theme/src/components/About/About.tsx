import { useInfos } from "../../provider/InfosProvider"

export function About() {
    const { infos } = useInfos()

    return (
        <div className="w-full mx-auto px-2 py-5 xl:py-[60px]">
            <div className="w-full max-w-[1300px] flex mx-auto">
                {infos && (
                    <>
                        <div className="w-7/12">
                            <figure className="w-full">
                                <img src={infos.about.image} alt="" />
                            </figure>
                        </div>

                        <div className="w-5/12 pl-1 flex flex-col">
                            <h2 className="text-blue-900 text-xl font-medium font-pop mb-[12px]">{infos.about.title}</h2>
                            <div className="font-pop text-black text-base font-normal leading-[30px]" dangerouslySetInnerHTML={{__html: infos.about.content}}></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}