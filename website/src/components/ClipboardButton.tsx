import React from 'react'
import { cn } from '@/utils/tailwindClassMerge'
import { IconClipboard } from './icons/IconClipboard'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from './DropdownMenu'
import {
  PACKAGE_MANAGERS,
  PACKAGE_MANAGERS_LIST,
  PACKAGE_NAME,
  SCRIPTS
} from '@/constants/npm.const'
import { IconCheck } from './icons/IconCheck'

type PackageManager = typeof PACKAGE_MANAGERS_LIST[number]

type ClipboardButtonProps = React.ComponentProps<'button'> & {
  packageName?: string;
}

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({ className, ...props }) => {
  const [icon, setIcon] = React.useState<'copy' | 'done'>('copy')

  const Icon = {
    copy: IconClipboard,
    done: IconCheck
  }[icon]

  function toggleIcon() {
    setIcon('done')
    setTimeout(() => {
      setIcon('copy')
    }, 3000)
  }

  const copyToClipboard = (packageManager: PackageManager) => () => {
    if (!navigator.clipboard) return

    const script = SCRIPTS[packageManager]
    const command = `${script} ${PACKAGE_NAME}`
    navigator.clipboard.writeText(command)
      .then(() => toggleIcon())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn('focus:outline-none focus-visible:outline-white/20 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer', className)}
        {...props}
      >
        <Icon width={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='z-10 bg-surface-raised/80 backdrop-blur-xl border-none shadow-xl shadow-black/40'>
        <DropdownMenuItem
          className='hover:bg-white/5 rounded-md cursor-pointer text-text-secondary'
          onClick={copyToClipboard(PACKAGE_MANAGERS.NPM)}
        >
          npm
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:bg-white/5 rounded-md cursor-pointer text-text-secondary'
          onClick={copyToClipboard(PACKAGE_MANAGERS.YARN)}
        >
          yarn
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:bg-white/5 rounded-md cursor-pointer text-text-secondary'
          onClick={copyToClipboard(PACKAGE_MANAGERS.PNPM)}
        >
          pnpm
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:bg-white/5 rounded-md cursor-pointer text-text-secondary'
          onClick={copyToClipboard(PACKAGE_MANAGERS.BUN)}
        >
          bun
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
