import React, { type Dispatch, type SetStateAction } from 'react'
import { styled } from 'styled-components'
import { themedIcon } from '../../themes/icons'
import { themedVariant } from '../../themes/theme'
import { useClasses } from '../../hooks'

export interface PaginationProps {
  level: number
  page?: number
  setPage?: (page: number) => void
  numPages: number
  showEnds?: boolean
  className?: string
}

export const PaginationComponent = ({ className, page, numPages, showEnds, setPage }: PaginationProps): JSX.Element => {
  const [btn1, setBtn1] = React.useState('')
  const [btn2, setBtn2] = React.useState('')
  const [btn3, setBtn3] = React.useState('')
  const [btn4, setBtn4] = React.useState('')

  const pulseButton = (btn: string, setBtn: Dispatch<SetStateAction<string>>): void => {
    setBtn('pulse1')
    setTimeout(() => {
      setBtn('')
    }, 400)
  }

  const gotoPage = React.useCallback((newPage: number) => {
    newPage = Math.min(numPages, Math.max(1, newPage))
    if (newPage !== page) {
      setPage?.(newPage)
    }
  }, [page, setPage])

  const gotoStart = React.useCallback(() => {
    if (page !== 1) {
      gotoPage(1)
      pulseButton(btn1, setBtn1)
    }
  }, [page, setPage])

  const gotoEnd = React.useCallback(() => {
    if (page !== numPages) {
      gotoPage(numPages)
      pulseButton(btn4, setBtn4)
    }
  }, [page, setPage])

  const previousStep = React.useCallback(() => {
    if (page !== undefined && page > 1) {
      gotoPage(page - 1)
      pulseButton(btn2, setBtn2)
    }
  }, [page, setPage])

  const nextStep = React.useCallback(() => {
    if (page !== undefined && page < numPages) {
      gotoPage(page + 1)
      pulseButton(btn3, setBtn3)
    }
  }, [page, setPage])

  const paginationClasses = useClasses([
    'aics-pagination',
    className
  ], [className])

  const startClasses = useClasses([
    'aics-pagination-start',
    'aics-button-group-start',
    btn1
  ], [btn1])

  const previousClasses = useClasses([
    () => page === 1 ? ['disabled'] : [],
    'aics-pagination-previous',
    () => !showEnds ? ['aics-button-group-start'] : [],
    'aics-button-group-end',
    btn2
  ], [page, showEnds, btn2])

  const nextClasses = useClasses([
    () => page === numPages ? ['disabled'] : [],
    'aics-pagination-next',
    'aics-button-group-start',
    () => !showEnds ? ['aics-button-group-end'] : [],
    btn3
  ], [page, numPages, btn3])

  const endClasses = useClasses([
    () => page === numPages ? ['disabled'] : [],
    'aics-pagination-end',
    'aics-button-group-end',
    btn4
  ], [page, numPages, btn4])


  if (showEnds === true) {
    return <div className={paginationClasses}>
      <button className={startClasses} title="Return to start" onClick={gotoStart}></button>
      <button className={previousClasses} title="Previous" onClick={previousStep}></button>
      <span className="aics-pagination-page">{page as number} of {numPages}</span>
      <button className={nextClasses} title="Next" onClick={nextStep}></button>
      <button className={endClasses} title="Jump to end" onClick={gotoEnd}></button>
    </div>
  } else {
    return <div className={paginationClasses}>
      <button className={previousClasses} title="Previous" onClick={previousStep}></button>
      <span className="aics-pagination-page">{page as number} of {numPages}</span>
      <button className={nextClasses} title="Next" onClick={nextStep}></button>
    </div>
  }
}

export const Pagination = styled(PaginationComponent)`
text-align: left;

.aics-pagination-page {
    vertical-align: top;
    line-height: 24px;
    margin: 0 8px;
    font-family: ${themedVariant('fontFamily', null, false)};
    font-size: 10pt;
    font-variant-numeric: tabular-nums;
    color: ${themedVariant('textColor', null, false)};
}
  
button {
    border: 0;
    background-color: ${themedVariant('buttonBgColor', null, false)};
    color: ${themedVariant('secondaryTextColor', null, false)};
    margin: 0 1px;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
}

button.aics-button-group-start {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

button.aics-button-group-end {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
  
button:hover {
    background-color: ${themedVariant('buttonHoverBgColor', null, false)};
}

button.disabled:hover {
  background-color: ${themedVariant('buttonBgColor', null, false)};
}
  
button:focus {
    outline: 0;
}

button.pulse1 {
    animation-name: pulse1;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    animation-direction: alternate-reverse;
    animation-timing-function: ease;
}

button.disabled.pulse1 {
  animation-name: none;
}
  
@keyframes pulse1 {
    0% {}
    50% {
      background-color: ${themedVariant('buttonPulseBgColor', null, false)};
    }
    100% {}
}

.aics-pagination-previous {
  background-image: ${themedIcon('left', 20, themedVariant('secondaryTextColor', null, false))};
  background-position: 1px 2px;
}

.aics-pagination-previous.disabled {
  background-image: ${themedIcon('left', 20, themedVariant('fadedTextColor', null, false))};
}

.aics-pagination-next {
  background-image: ${themedIcon('right', 20, themedVariant('secondaryTextColor', null, false))};
  background-position: 2px 2px;
}

.aics-pagination-next.disabled {
  background-image: ${themedIcon('right', 20, themedVariant('fadedTextColor', null, false))};
}

.aics-pagination-start {
  background-image: ${themedIcon('start', 20, themedVariant('secondaryTextColor', null, false))};
  background-position: 2px 0;
  width: 28px;
  background-size: 24px;
}

.aics-pagination-start.disabled {
  background-image: ${themedIcon('start', 20, themedVariant('fadedTextColor', null, false))};
}

.aics-pagination-end {
  background-image: ${themedIcon('end', 20, themedVariant('secondaryTextColor', null, false))};
  background-position: 0;
  width: 28px;
  background-size: 24px;
}

.aics-pagination-end.disabled {
  background-image: ${themedIcon('end', 20, themedVariant('fadedTextColor', null, false))};
}
`
