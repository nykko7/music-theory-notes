import React from 'react'
import { NOTE_TO_KEY, KEY_TO_NOTE } from '../../global/constants'
import styles from './key.module.css'

const isFlat = (note) => note.includes('#')

const isPressed = (note, pressedKeys) => pressedKeys.includes(NOTE_TO_KEY[note])

const Key = ({ note, pressedKeys }) => {
  const isNoteFlat = isFlat(note)
  const isNotePressed = isPressed(note, pressedKeys)
  console.log(isNotePressed)
  const keyColor = isNoteFlat ? 'black' : 'white'

  const keyClassName = `${styles.key} ${styles[keyColor]} ${
    isNotePressed ? styles.pressed : ''
  }`

  let key

  if (isNoteFlat) {
    key = <div className={keyClassName}></div>
  } else {
    key = (
      <div className={keyClassName}>
        <div>
          <div className={styles.keyText}>{note.toUpperCase()}</div>
        </div>
      </div>
    )
  }

  return key
}

export default Key
