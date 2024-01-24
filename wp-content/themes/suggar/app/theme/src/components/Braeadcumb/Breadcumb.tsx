import { ChevronRight } from "lucide-react";

export function BreadCumb() {


    return (
        <div className="w-full h-[58px] py-2.5 bg-neutral-50 justify-start items-center flex">
            <div className="w-full max-w-[1300px] mx-auto flex items-center">
                <span className="flex items-center text-blue-900">
                    <a href='/' className="text-neutral-700 px-2 text-xs font-normal font-pop">Home</a>
                    <ChevronRight size={20} className="mr-2 text-blue-900" />
                </span>

                {window.post_info && window.post_info.breadcrumbs && window.post_info.breadcrumbs.map((b, k) => (
                    <span key={k} className="flex items-center text-blue-900">
                        <a href={b.link} className="text-neutral-700 px-2 text-xs font-normal font-pop">{b.name}</a>
                        <ChevronRight size={20} className="mr-2 text-blue-900" />
                    </span>
                ))}

                {window.post_info && (
                    <span  className="px-2 text-blue-900 text-xs font-bold font-pop">
                        {window.post_info.title}
                    </span>
                )}
            </div>
        </div>
    )
}