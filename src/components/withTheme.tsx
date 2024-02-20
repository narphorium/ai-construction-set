import React, { forwardRef, type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react'
import { ThemeProvider } from 'styled-components'
import { DarkModeContext } from '../hooks/DarkModeProvider'
import { type BaseProps } from './Base'

export interface BlockRef {
  scrollIntoView: (args: any) => void
}

export const withTheme = <TProps extends BaseProps>(
  Component: ComponentType<TProps>,
  params: { lightTheme: any, darkTheme: any }
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<any>> => {
  const WithTheme = forwardRef(function (props: TProps, ref): JSX.Element {
    const { darkMode } = React.useContext(DarkModeContext)
    const [theme, setTheme] = React.useState(params.lightTheme)

    React.useEffect(() => {
      if (darkMode != null) {
        setTheme(darkMode ? params.darkTheme : params.lightTheme)
      }
    }, [darkMode])

    return <ThemeProvider theme={theme}>
      <Component
          {...props}
          ref={ref} />
      </ThemeProvider>
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithTheme.displayName = `withTheme(${componentName})`
  return WithTheme
}
