import React, { startTransition, Suspense } from 'react'
import MyErrorBoundary from './MyErrorBoundary'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Toggle = React.lazy(() => import('./Toggle'))
const Clock = React.lazy(() => import('./clock'))

function MyCompont() {
  const [tab, setTab] = React.useState('photos')

  function handleTabSelect(tab) {
    startTransition(() => {
      setTab(tab)
    })
  }

  return (
    <div>
      <MyErrorBoundary>
        <div onTabSelect={handleTabSelect}></div>
        <Suspense fallback={<div>Loading...</div>}>
          {tab === 'photos' ? <Toggle></Toggle> : <Clock></Clock>}
          <Routes>
            <Route path="/" element={<Toggle />}></Route>
            <Route path="/clock" element={<Clock />}></Route>
          </Routes>
        </Suspense>
      </MyErrorBoundary>
    </div>
  )
}

export default MyCompont
