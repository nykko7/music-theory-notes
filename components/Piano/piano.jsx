import React, { useEffect, useState } from 'react'
import Key from './key'
import styles from './piano.module.css'
import { NOTES, VALID_KEYS, KEY_TO_NOTE } from '../../global/constants'

const Piano = ({ markedNotesa }) => {
  console.log(markedNotesa)
  const [pressedNotes, setPressedNotes] = useState([])
  const [markedNotes, setMarkedNotes] = useState(markedNotesa)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  }, [])

  const handleKeyDown = (event) => {
    if (event.repeat) {
      return
    }
    const key = event.key
    if (VALID_KEYS.includes(key)) {
      addToPressedNotes(KEY_TO_NOTE[key])
    }
  }

  const handleKeyUp = (event) => {
    const key = event.key
    removeFromPressedNotes(KEY_TO_NOTE[key])
  }

  const removeFromPressedNotes = (key) => {
    const updatedPressedNotes = [...pressedNotes]
    const index = updatedPressedNotes.indexOf(key)
    if (index > -1) {
      updatedPressedNotes.splice(index, 1)
    }
    setPressedNotes(updatedPressedNotes)
  }

  const addToPressedNotes = (note) => {
    setPressedNotes([...pressedNotes, note])
  }

  return (
    <div className={styles.piano}>
      {NOTES.map((note, index) => (
        <Key
          key={index}
          note={note}
          pressedNotes={pressedNotes}
          markedNotes={markedNotes}
          removeFromPressedNotes={removeFromPressedNotes}
          addToPressedNotes={addToPressedNotes}
        />
      ))}
    </div>
  )
}

Piano.defaultProps = {
  markedNotesa: [],
}

export default Piano
