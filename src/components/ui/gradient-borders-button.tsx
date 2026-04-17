import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface GradientBordersButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export default function GradientBordersButton({
  className,
  children,
  ...props
}: GradientBordersButtonProps) {
  return (
    <button
      className={cn(
        'group relative inline-block cursor-pointer rounded-full border-none bg-card p-0.5 text-xs leading-6 font-semibold text-foreground no-underline outline-none focus-visible:ring-1 focus-visible:ring-orange-400',
        className
      )}
      type='button'
      {...props}
    >
      <span className='absolute inset-0 overflow-hidden rounded-full'>
        <span className='absolute inset-0 rounded-full bg-[radial-gradient(75%_100%_at_50%_0%,hsl(24,95%,53%)_0%,hsl(40,96%,70%)_75%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100' />
      </span>
      <div className='relative z-10 flex h-8 items-center space-x-2 rounded-full bg-card px-4 text-foreground/90 ring-2 ring-white/10'>
        <span>{children || 'Solicitar Orçamento'}</span>
      </div>
      <span className='absolute bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-orange-500/0 via-orange-400/90 to-orange-500/0 transition-opacity duration-500 group-hover:opacity-60' />
    </button>
  )
}
