import React, { useEffect, useState } from 'react'
import Key from './key'
import styles from './piano.module.css'
import { NOTES, VALID_KEYS } from '../../global/constants'

const Piano = () => {
  const [pressedKeys, setPressedKeys] = useState([])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  }, [])

  const handleKeyDown = (event) => {
    if (event.repeat) {
      return
    }
    const key = event.key
    if (!pressedKeys.includes(key) && VALID_KEYS.includes(key)) {
      setPressedKeys([...pressedKeys, key])
    }
  }

  const handleKeyUp = (event) => {
    const key = event.key
    const updatedPressedKeys = [...pressedKeys]
    const index = updatedPressedKeys.indexOf(key)
    if (index > -1) {
      updatedPressedKeys.splice(index, 1)
    }
    setPressedKeys(updatedPressedKeys)
  }

  return (
    <div className={styles.piano}>
      {NOTES.map((note, index) => (
        <Key key={index} note={note} pressedKeys={pressedKeys} />
      ))}
    </div>
  )
}

export default Piano
