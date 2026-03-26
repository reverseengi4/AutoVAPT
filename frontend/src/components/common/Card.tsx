import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  title?: ReactNode
  subtitle?: string
  action?: ReactNode
}

export default function Card({ children, className, title, subtitle, action }: CardProps) {
  return (
    <div className={clsx('glass-panel rounded-2xl overflow-hidden', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/5">
          <div>
            {title && <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}
