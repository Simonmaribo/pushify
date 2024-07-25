type SectionIntroProps = {
    heading:string,
    paragraph?:string,
    children?: React.ReactNode,
}

export default function SectionIntro(props:SectionIntroProps) {
    return (
        <section className="pb-24">
            <div className="w-[86%] flex flex-col gap-6 mx-auto max-w-[930px]">
                <h1 className="font-semibold tracking-tighter max-w-xl text-5xl">{props.heading}</h1>
                <p className="text-xl max-w-lg text-gray-600">
                    We have made it easy to integrate and track your important events in
                    just a few minutes.
                </p>
            </div>
        </section>
    )
}