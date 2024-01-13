import React, { forwardRef, type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react'
import { ThemeProvider } from 'styled-components'
import useDarkMode from '../hooks/useDarkMode'
import { type BaseProps } from './Base'

export interface BlockRef {
  scrollIntoView: (args: any) => void
}

export const withTheme = <TProps extends BaseProps>(
  Component: ComponentType<TProps>,
  params: { lightTheme: any, darkTheme: any }
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<any>> => {
  const WithTheme = forwardRef(function (props: TProps, ref): JSX.Element {
    const isDarkMode = useDarkMode()
    const [theme, setTheme] = React.useState(params.lightTheme)

    React.useEffect(() => {
      setTheme(isDarkMode ? params.darkTheme : params.lightTheme)
    }, [isDarkMode])

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
