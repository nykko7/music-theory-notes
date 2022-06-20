import React, { useEffect, useState } from 'react'
import Key from './key'
import styles from './piano.module.css'
import { NOTES, VALID_KEYS, KEY_TO_NOTE } from '../../global/constants'
import { Range } from '@tonaljs/tonal'

import * as Tone from 'tone'

const Piano = ({ configuration }) => {
  const [pressedNotes, setPressedNotes] = useState([])
  const [synth, setSynth] = useState(null)

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination()
    setSynth(newSynth)
    return () => synth.stop()
  }, [])

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown)
  //   window.addEventListener('keyup', handleKeyUp)
  // }, [])

  useEffect(() => {
    if (synth) {
      if (pressedNotes.length > 0)
        synth.triggerAttackRelease(pressedNotes[0], '8n')
    }
  }, [pressedNotes])

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
      {configuration.notes.map((note, index) => (
        <Key
          key={index}
          note={note}
          pressedNotes={pressedNotes}
          markedNotes={configuration.markedNotes}
          removeFromPressedNotes={removeFromPressedNotes}
          addToPressedNotes={addToPressedNotes}
        />
      ))}
    </div>
  )
}

Piano.defaultProps = {
  configuration: {
    markedNotes: [],
    notes: [...Range.chromatic(['C5', 'C6'], { sharps: true })],
  },
}

export default Piano
