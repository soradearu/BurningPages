import { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [note, setNote] = useState({
    text: '',
    burn: 0,
    active: true,
  })

  const timerRef = useRef(null)
  const intervalRef = useRef(null)

  const resetNote = () => {
    setNote({
      text: '',
      burn: 0,
      active: true,
    })
  }

 const startBurn = () => {
  if (intervalRef.current) return

  intervalRef.current = setInterval(() => {
    setNote((prev) => {
      let decay = 2 // slower base burn 

      const next = prev.burn + decay

      if (next >= 100) {
        clearInterval(intervalRef.current)
        intervalRef.current = null

        setEcho?.(prev.text)

        setTimeout(() => {
          resetNote()
          setEcho?.(null)
        }, 1500)

        return { ...prev, burn: 100 }
      }

      return { ...prev, burn: next }
    })
  }, 70)
}
const handleChange = (value) => {
  setNote((prev) => ({
    ...prev,
    text: value,
  }))

  // always cancel pending burn start
  if (timerRef.current) clearTimeout(timerRef.current)

  // burn resistance: stop mid burn when user types
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  // restart safe timer
  timerRef.current = setTimeout(() => {
    startBurn()
  }, 2000)
}

  return (
    <div className="app">
      <div className="topbar">
        
        <h1>Burning Pages</h1>
      </div>

      <div className="page">
        {note.burn < 100 ? (
          <textarea
            value={note.text}
            placeholder="Whatever you write disappear we promise..."
            onChange={(e) => handleChange(e.target.value)}
            style={{
              opacity: 1 - note.burn / 140,
              transform: `scale(${1 - note.burn / 400})`,
            }}
          />
        ) : (
          <div className="gone">gone.</div>
        )}

        <div
          className="burn"
          style={{
            width: `${note.burn}%`,
          }}
        />
      </div>
    </div>
  )
}