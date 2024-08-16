import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';


interface MeetingModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title:string;
    className?:string;
    children?:ReactNode;
    handleClick?:()=>void;
    buttonText?:string;
    img?:string;
    buttonIcon?:string;
}
const MeetingModal = ({isOpen,onClose,title,className,children,handleClick,buttonText,img,buttonIcon}:MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
      <div className='flex flex-col gap-6'>
        {img && (<div className='flex flex-col gap-6'>
          <Image src={img} alt="image" width={72} height={72}/>
          </div>)}
          <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
          {children}
          <button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 border-none outline-none rounded-full' onClick={handleClick}>
            {buttonIcon && <Image src={buttonIcon} alt="button icon" height={13} width={13}/>}&nbsp;
            {buttonText || "Schedule Meeting"}
          </button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}

export default MeetingModal