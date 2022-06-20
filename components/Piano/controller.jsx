import React, { useEffect, useState } from 'react'
import Piano from './piano'

import * as _ from 'lodash'

import { Scale, Interval, Range } from '@tonaljs/tonal'
import {
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  TextField,
} from '@mui/material'

const DEFAULT_CONFIG = {
  markedNotes: [],
  notes: [...Range.chromatic(['C4', 'C6'], { sharps: true })],
}

const ROOT_NOTES = [...Range.chromatic(['C4', 'B4'], { sharps: true })]

const SCALES = [
  'major',
  'minor',
  // 'dolia',
  // 'phrygian',
  // 'lydian',
  // 'mixolydian',
  // 'aeolian',
  // 'locrian',
  // 'chromatic',
]

const PianoController = () => {
  const [configuration, setConfiguration] = useState(DEFAULT_CONFIG)
  const [selectedScale, setSelectedScale] = useState('')
  const [selectedNote, setSelectedNote] = useState('C4')

  useEffect(() => {
    const scaleNotes =
      selectedScale !== ''
        ? Scale.get(`${selectedNote} ${selectedScale}`).notes
        : []

    const newConfiguration =
      selectedScale !== ''
        ? _.merge({ ...configuration }, { markedNotes: scaleNotes })
        : { ...configuration, markedNotes: [] }

    setConfiguration(newConfiguration)
  }, [selectedScale, selectedNote])

  return (
    <div>
      <Select
        value={selectedNote}
        sx={{ width: 300, marginY: 2 }}
        onChange={(event) => setSelectedNote(event.target.value)}
      >
        {ROOT_NOTES.map((note) => (
          <MenuItem key={note} value={note}>
            {note}
          </MenuItem>
        ))}
      </Select>
      <Autocomplete
        disablePortal
        id="combo-select-scale"
        options={Scale.names()}
        sx={{ width: 300, marginY: 2 }}
        renderInput={(params) => <TextField {...params} label="Select Scale" />}
        onChange={(event) => setSelectedScale(event.target.textContent)}
      />
      <Piano configuration={configuration} />
    </div>
  )
}

export default PianoController
