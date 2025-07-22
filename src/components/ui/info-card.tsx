import { ShineBorderWrapper } from "../magicui/shine-border";

function InfoCard({ children }: { children: React.ReactNode }) {
    return (
        
        <ShineBorderWrapper 
            className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 font-bold text-lg h-full"
            shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            borderWidth={1}
            duration={25}
        >
        {children}
        </ShineBorderWrapper>
    )
}

export default InfoCard;