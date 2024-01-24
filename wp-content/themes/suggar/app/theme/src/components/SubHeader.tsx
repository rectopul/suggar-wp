import {  Menu } from "lucide-react";

export default function SubHeader() {

    return (
        <div className="w-full flex content-center items-center py-4">
            <div className="w-full md:w-[1400px] mx-auto flex justify-between px-2 md:px-0">
                <ul className="hidden md:flex content-center items-center">
                    <li>
                        <Menu />
                    </li>
                </ul>
            </div>
        </div>
    )
}