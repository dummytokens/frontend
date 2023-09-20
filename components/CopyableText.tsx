import { Icon } from "@iconify/react";
import { Fira_Mono } from "next/font/google";
import { ReactNode, useState } from "react";

const fira = Fira_Mono({ weight: "400", subsets: ['latin']});

interface Props {
    children: string;
}

export default function CopyableText({children}: Props) {
    const [copy, setCopy] = useState<boolean>(false);

    const handleCopy = () => {
      setCopy(true);
      navigator.clipboard.writeText(children)
      setTimeout(()=>setCopy(false), 1000);
    }
    
    return <div onClick={handleCopy} className='cursor-pointer active:scale-95 hover:bg-gray-400/30 active:bg-gray-400/10 transition-all flex flex-row gap-4 rounded-lg py-2 px-4 bg-gray-400/20 w-fit'>
        <span className={fira.className}>{children}</span>
        {!copy && <Icon className='m-auto' icon='ion:copy'/>}
        {copy && <Icon className='m-auto' icon='tabler:circle-check-filled'/>}
    </div>
}