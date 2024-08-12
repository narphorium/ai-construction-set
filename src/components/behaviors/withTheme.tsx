import React, { forwardRef, useState, type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react'
import { ThemeProvider } from '../../state/context/ThemeContext'
import { BlockComponentProps } from '../blocks/Base'
import { useDarkMode } from '../../hooks'

export const withTheme = <TProps extends BlockComponentProps<any>>(
  Component: ComponentType<TProps>,
  params: { theme: string }
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<any>> => {
  const WithTheme = forwardRef(function (props: TProps, ref): JSX.Element {
    const [theme, setTheme] = useState(params.theme)
    const [darkMode, setDarkMode] = useDarkMode()

    return <ThemeProvider theme={theme} darkMode={darkMode} setTheme={(theme: string) => setTheme(theme)}>
      <Component
        {...props}
        ref={ref} />
    </ThemeProvider>
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithTheme.displayName = `withTheme(${componentName})`
  return WithTheme
}
