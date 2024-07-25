type SectionIntroProps = {
    heading:string,
    paragraph?:string,
    children?: React.ReactNode,
}

export default function SectionIntro(props:SectionIntroProps) {
    return (
        <section className="pb-24">
            <div className="w-[86%] mx-auto max-w-[930px]">
                <h1 className="font-semibold text-4xl">{props.heading}</h1>
            </div>
        </section>
    )
}