import React, { ReactNode } from 'react'
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
    <div>
      meeting modal
    </div>
  )
}

export default MeetingModal
