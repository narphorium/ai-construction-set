import React, { type Dispatch, type SetStateAction } from 'react'
import { styled } from 'styled-components'
import { themedIcon } from '../themes/icons'
import { themedVariant } from '../themes/theme'
import { getClasses, type PaginatedProps } from './Base'

export interface PaginationProps extends PaginatedProps {
  numPages: number
  showEnds?: boolean
}

export const PaginationComponent = ({ className, page, numPages, showEnds, setPage, variant }: PaginationProps): JSX.Element => {
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
    gotoPage(1)
    pulseButton(btn1, setBtn1)
  }, [page, setPage])

  const gotoEnd = React.useCallback(() => {
    gotoPage(numPages)
    pulseButton(btn4, setBtn4)
  }, [page, setPage])

  const previousStep = React.useCallback(() => {
    if (page !== undefined) {
      gotoPage(page - 1)
      pulseButton(btn2, setBtn2)
    }
  }, [page, setPage])

  const nextStep = React.useCallback(() => {
    if (page !== undefined) {
      gotoPage(page + 1)
      pulseButton(btn3, setBtn3)
    }
  }, [page, setPage])

  if (showEnds === true) {
    return <div className={getClasses('aics-pagination', className)}>
            <button className={'aics-pagination-start aics-button-group-start ' + btn1} title="Return to start" onClick={gotoStart}></button>
            <button className={'aics-pagination-previous aics-button-group-end ' + btn2} title="Previous" onClick={previousStep}></button>
            <span className="aics-pagination-page">{ page as number } of { numPages }</span>
            <button className={'aics-pagination-next aics-button-group-start ' + btn3} title="Next" onClick={nextStep}></button>
            <button className={'aics-pagination-end aics-button-group-end ' + btn4} title="Jump to end" onClick={gotoEnd}></button>
        </div>
  } else {
    return <div className={getClasses('aics-pagination', className)}>
            <button className={'aics-pagination-previous aics-button-group-start aics-button-group-end ' + btn2} title="Previous" onClick={previousStep}></button>
            <span className="aics-pagination-page">{ page as number } of { numPages }</span>
            <button className={'aics-pagination-next aics-button-group-start aics-button-group-end ' + btn3} title="Next" onClick={nextStep}></button>
        </div>
  }
}

export const Pagination = styled(PaginationComponent)`
text-align: left;

.aics-pagination-page {
    vertical-align: top;
    line-height: 22px;
    margin: 0 8px;
    font-family: ${themedVariant('fontFamily')};
    font-size: 10pt;
    color: ${themedVariant('textColor')};
}
  
button {
    border: 0;
    background-color: ${themedVariant('buttonBgColor')};
    border-radius: 4px;
    color: ${themedVariant('fadedTextColor')};
    margin: 0 1px;
    width: 22px;
    height: 22px;
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
    background-color: ${themedVariant('buttonHoverBgColor')};
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
  
@keyframes pulse1 {
    0% {}
    50% {
      background-color: ${themedVariant('buttonPulseBgColor')};
    }
    100% {}
}

.aics-pagination-previous {
  background-image: ${themedIcon('small-chevron-left', themedVariant('textColor'))};
  background-position: 0 1px;
}

.aics-pagination-next {
  background-image: ${themedIcon('small-chevron-right', themedVariant('textColor'))};
  background-position: 2px 1px;
}
`
