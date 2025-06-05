import * as React from 'react'
import { ErrorMessageWrapper } from '@/components/ui/ErrorMessageWrapper'
import { ControllerProps, useController, useFormContext } from 'react-hook-form'
import { X } from 'lucide-react'
import { Spinner } from './spinner'
import { cn } from '@/lib/utils'
import { MaskitoOptions } from '@maskito/core'
import { useMaskito } from '@maskito/react'
import { withMaskitoRegister } from '@/utils/with-maskito-register'

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    isCleanable?: boolean
    isLoading?: boolean
    containerClassName?: string
    maskitoOptions?: MaskitoOptions
    errorMessageWrapperClassName?: string
    leftContent?: React.ReactNode
    rightContent?: React.ReactNode
  } & Pick<ControllerProps, 'name' | 'rules' | 'defaultValue'>
>(
  (
    {
      className,
      type,
      name,
      rules,
      defaultValue,
      isCleanable = true,
      disabled,
      isLoading,
      containerClassName,
      maskitoOptions,
      errorMessageWrapperClassName,
      leftContent,
      rightContent,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        type === 'number' &&
        ['e', 'E', '+', '-'].includes(event.key) &&
        !(event.key === '-' && event.currentTarget.selectionStart === 0)
      ) {
        event.preventDefault()
      }
    }

    const { control, register } = useFormContext()

    const { field } = useController({
      name,
      control,
      rules,
      defaultValue,
    })

    const handleClear = () => {
      field.onChange('')
    }

    const inputRef = useMaskito({ options: maskitoOptions })

    return (
      <ErrorMessageWrapper name={name} className={errorMessageWrapperClassName}>
        <div className={cn('relative flex items-center', containerClassName)}>
          {leftContent && <div className="absolute left-2">{leftContent}</div>}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Spinner size="s" />
            </div>
          )}
          <input
            type={type}
            className={cn(
              'border-input ring-offset-background focus-visible:ring-ring flex h-full w-full gap-[8px] rounded-[12px] border bg-background-gray p-[16px] text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-base placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              type === 'number' &&
                'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              className
            )}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            {...props}
            {...field}
            ref={ref}
            {...(maskitoOptions &&
              withMaskitoRegister(register(name, rules), inputRef))}
          />
          {!disabled && !isLoading && isCleanable && field.value && (
            <button
              type="button"
              onClick={handleClear}
              className="link absolute right-2"
            >
              <X className="!size-5 text-icon-gray" />
            </button>
          )}
          {rightContent}
        </div>
      </ErrorMessageWrapper>
    )
  }
)

Input.displayName = 'Input'

export { Input }
