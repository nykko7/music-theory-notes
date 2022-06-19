import React, { useEffect } from 'react'
import { NOTE_TO_KEY, KEY_TO_NOTE } from '../../global/constants'
import styles from './key.module.css'

const isFlat = (note) => note.includes('#')

const isPressed = (note, pressedNotes) => pressedNotes.includes(note)
const isMarked = (note, markedNotes) => markedNotes.includes(note)

const Key = ({
  note,
  pressedNotes,
  markedNotes,
  removeFromPressedNotes,
  addToPressedNotes,
}) => {
  const isNoteFlat = isFlat(note)
  const isNotePressed = isPressed(note, pressedNotes)
  const isNoteMarked = isMarked(note, markedNotes)

  const keyColor = isNoteFlat ? 'black' : 'white'

  const keyClass = `${styles.key} ${styles[keyColor]} ${
    isNotePressed ? styles.pressed : ''
  }`

  const keyTextClass = `${styles.keyText} ${isNoteMarked ? styles.marked : ''}`

  const handleMouseDown = (note) => {
    addToPressedNotes(note)
  }

  const handleMouseUp = (note) => {
    removeFromPressedNotes(note)
  }

  let key

  if (isNoteFlat) {
    key = (
      <button
        className={keyClass}
        onMouseDown={() => handleMouseDown(note)}
        // onKeyDownCapture={() => handleMouseDown(note)}
        onMouseUp={() => handleMouseUp(note)}
      >
        <div className={keyTextClass}>{note.toUpperCase()}</div>
      </button>
    )
  } else {
    key = (
      <button
        className={keyClass}
        onMouseDown={() => handleMouseDown(note)}
        onMouseUp={() => handleMouseUp(note)}
      >
        <div className={keyTextClass}>{note.toUpperCase()}</div>
      </button>
    )
  }

  return key
}

export default Key
