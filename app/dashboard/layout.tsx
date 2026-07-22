import Image from "next/image";
import favicon from "../favicon.ico";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>

        <nav className="bg-transparent z-20 text-white p-4">
        <div className="flex gap-4 align-middle"> <Image className="h-8 w-8" src={favicon} alt="Favicon" width={24} height={24}></Image> <h1 className="text-xl align-middle">Bonini Shortener</h1></div></nav>
        {children}
        
        </>
    )
}