import { Reveal } from "@/components/Animations/Reveal";
import { RevealLight } from "@/components/Animations/RevealLight";
import Link from "next/link";

export default function Hero() {
    return (
        <section style={{background: "radial-gradient(rgba(39,7,93,1) 0%, rgba(25,2,64,1) 100%)"}} className="min-h-screen z-10">
            <div className="pt-40 w-[90%] flex flex-col gap-12 mx-auto max-w-4xl text-center text-white">
                <div className="flex flex-col gap-6 z-10 relative">
                        <div className="flex mb-2">
                            <div className="rounded-full px-5 py-1 text-sm mx-auto border border-gray-100/30 text-white bg-white/20 backdrop:blur-100">
                                <p>Push notifications made easier</p>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl xl:text-7xl font-semibold">Push notifications <span className="gradient-text">services</span></h2>

                        <p className="text-lg font-normal max-w-2xl mx-auto text-gray-200">Software tailored to ambitious ecommerce agencies and fast-growing ecommerce companies. Increase your profits, save time and get.</p>
                </div>
                <div>
                        <Link className="rounded-full z-10 text-blue-950 font-semibold px-5 py-2 bg-gradient-to-r from-blue-50 to-blue-100" href={"/"}>Sign up for waitlist</Link>
                </div>
            </div>
            <img className="z-10 relative" src="/hero.svg"></img>
        </section>
    )
}