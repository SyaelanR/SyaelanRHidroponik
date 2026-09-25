import Link from "next/link";

export default function Hallolayouts({children}: {children: React.ReactNode}) {
    return(
        <>
        <nav className="fixed left-0 top-10 h-screen w-60 bg-gray-600">
            <ul className="text-white p-5">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li><Link href="/hallo/about">About</Link></li>
                <li>Profile</li>
            </ul>
        </nav>
        {children}
        </>
    )
}