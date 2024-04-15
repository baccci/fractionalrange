import React from 'react'
import classNames from 'classnames'

interface TitlebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode
}

export const Titlebar: React.FC<TitlebarProps> = ({ className, children, ...rest }) => {
  return (
    <div
      className={classNames('titlebar', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

Titlebar.displayName = 'Titlebar'
