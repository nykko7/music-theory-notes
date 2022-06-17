import React, { useEffect, useState } from 'react'
// import MIDISounds from 'midi-sounds-react'

import dynamic from 'next/dynamic'

const MIDISounds = dynamic(() => import('midi-sounds-react'), {
  ssr: false,
})

const STYLE = {
  keyWhite: {
    backgroundColor: '#dddddd',
    width: '0.5cm',
    height: '0.75cm',
  },
  keyWhitePress: {
    backgroundColor: '#773333',
    width: '0.5cm',
    height: '0.75cm',
  },
  keyBlack: {
    backgroundColor: '#333333',
    width: '0.5cm',
    height: '0.5cm',
  },
  keyBlackPress: {
    backgroundColor: '#990000',
    width: '0.5cm',
    height: '0.5cm',
  },
  keyNo: {
    width: '0.5cm',
    height: '0.5cm',
  },
  keyMargin: {
    width: '0.25cm',
    height: '0.5cm',
  },
}

export const Octave = ({ pageProps }) => {
  const [selectedInstrument, setSelectedInstrument] = useState(0)
  const [status, setStatus] = useState('?')
  const [midiNotes, setMidiNotes] = useState([])
  const [envelopes, setEnvelopes] = useState([])
  // const [midiSounds, setMidiSounds] = useState(null)

  // const midiSounds = React.useRef(null)
  const midiSounds = React.createRef()
  const items = React.useRef(null)

  function onSelectInstrument(e) {
    const list = e.target
    let n = list.options[list.selectedIndex].getAttribute('value')

    setSelectedInstrument(n)

    midiSounds.cacheInstrument(n)
  }
  function createSelectItems() {
    if (midiSounds) {
      if (!items) {
        items = []
        for (
          let i = 0;
          i < midiSounds.player.loader.instrumentKeys().length;
          i++
        ) {
          items.push(
            <option key={i} value={i}>
              {'' +
                (i + 0) +
                '. ' +
                midiSounds.player.loader.instrumentInfo(i).title}
            </option>
          )
        }
      }
      console.log({ items })
      // return items
    }
  }
  function keyDown(n, v) {
    keyUp(n)
    const volume = 1
    if (v) {
      volume = v
    }
    envelopes[n] = midiSounds.player.queueWaveTable(
      midiSounds.audioContext,
      midiSounds.equalizer.input,
      window[
        midiSounds.player.loader.instrumentInfo(state.selectedInstrument)
          .variable
      ],
      0,
      n,
      9999,
      volume
    )
  }
  function keyUp(n) {
    if (envelopes) {
      if (envelopes[n]) {
        envelopes[n].cancel()
        //set state of item in array to null
        setEnvelopes(envelopes.filter((_, i) => i !== n))
      }
    }
  }
  function pressed(n) {
    if (envelopes) {
      if (envelopes[n]) {
        return true
      }
    }
    return false
  }
  function midiOnMIDImessage(event) {
    const data = event.data
    const cmd = data[0] >> 4
    const channel = data[0] & 0xf
    const type = data[0] & 0xf0
    const pitch = data[1]
    const velocity = data[2]
    switch (type) {
      case 144:
        this.keyDown(pitch, velocity / 127)
        break
      case 128:
        this.keyUp(pitch)
        break
    }
  }
  function onMIDIOnStateChange(event) {
    this.setStatus(
      event.port.manufacturer + ' ' + event.port.name + ' ' + event.port.state
    )
  }
  function requestMIDIAccessSuccess(midi) {
    console.log(midi)
    const inputs = midi.inputs.values()
    for (
      const input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      input.value.onmidimessage = midiOnMIDImessage.bind(this)
    }
    midi.onstatechange = onMIDIOnStateChange.bind(this)
  }
  function requestMIDIAccessFailure(e) {
    console.log('requestMIDIAccessFailure', e)
    setStatus('MIDI Access Failure')
  }
  function startListening() {
    setStatus('waiting')
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess()
        .then(
          requestMIDIAccessSuccess.bind(this),
          requestMIDIAccessFailure.bind(this)
        )
    } else {
      setStatus('navigator.requestMIDIAccess undefined')
    }
  }

  useEffect(() => {
    startListening()
  })
  console.log('midiSounds', midiSounds.current)

  return (
    <div>
      <p>
        <select value={selectedInstrument} onChange={onSelectInstrument}>
          {createSelectItems()}
        </select>
      </p>
      <p>Status: {status}</p>
      <table align="center">
        <tbody>
          <tr>
            <td style={STYLE.keyMargin}></td>

            <td
              style={pressed(1 + 12 * 2) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(1 + 12 * 2)}
              onMouseUp={(e) => keyUp(1 + 12 * 2)}
              onMouseOut={(e) => keyUp(1 + 12 * 2)}
            ></td>
            <td
              style={pressed(3 + 12 * 2) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(3 + 12 * 2)}
              onMouseUp={(e) => keyUp(3 + 12 * 2)}
              onMouseOut={(e) => keyUp(3 + 12 * 2)}
            ></td>
            <td style={STYLE.keyNo}></td>
            <td
              style={pressed(6 + 12 * 2) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(6 + 12 * 2)}
              onMouseUp={(e) => keyUp(6 + 12 * 2)}
              onMouseOut={(e) => keyUp(6 + 12 * 2)}
            ></td>
            <td
              style={pressed(8 + 12 * 2) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(8 + 12 * 2)}
              onMouseUp={(e) => keyUp(8 + 12 * 2)}
              onMouseOut={(e) => keyUp(8 + 12 * 2)}
            ></td>
            <td
              style={
                pressed(10 + 12 * 2) ? STYLE.keyBlackPress : STYLE.keyBlack
              }
              onMouseDown={(e) => keyDown(10 + 12 * 2)}
              onMouseUp={(e) => keyUp(10 + 12 * 2)}
              onMouseOut={(e) => keyUp(10 + 12 * 2)}
            ></td>
            <td style={STYLE.keyNo}></td>

            <td
              style={pressed(1 + 12 * 3) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(1 + 12 * 3)}
              onMouseUp={(e) => keyUp(1 + 12 * 3)}
              onMouseOut={(e) => keyUp(1 + 12 * 3)}
            ></td>
            <td
              style={pressed(3 + 12 * 3) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(3 + 12 * 3)}
              onMouseUp={(e) => keyUp(3 + 12 * 3)}
              onMouseOut={(e) => keyUp(3 + 12 * 3)}
            ></td>
            <td style={STYLE.keyNo}></td>
            <td
              style={pressed(6 + 12 * 3) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(6 + 12 * 3)}
              onMouseUp={(e) => keyUp(6 + 12 * 3)}
              onMouseOut={(e) => keyUp(6 + 12 * 3)}
            ></td>
            <td
              style={pressed(8 + 12 * 3) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(8 + 12 * 3)}
              onMouseUp={(e) => keyUp(8 + 12 * 3)}
              onMouseOut={(e) => keyUp(8 + 12 * 3)}
            ></td>
            <td
              style={
                pressed(10 + 12 * 3) ? STYLE.keyBlackPress : STYLE.keyBlack
              }
              onMouseDown={(e) => keyDown(10 + 12 * 3)}
              onMouseUp={(e) => keyUp(10 + 12 * 3)}
              onMouseOut={(e) => keyUp(10 + 12 * 3)}
            ></td>
            <td style={STYLE.keyNo}></td>

            <td
              style={pressed(1 + 12 * 4) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(1 + 12 * 4)}
              onMouseUp={(e) => keyUp(1 + 12 * 4)}
              onMouseOut={(e) => keyUp(1 + 12 * 4)}
            ></td>
            <td
              style={pressed(3 + 12 * 4) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(3 + 12 * 4)}
              onMouseUp={(e) => keyUp(3 + 12 * 4)}
              onMouseOut={(e) => keyUp(3 + 12 * 4)}
            ></td>
            <td style={STYLE.keyNo}></td>
            <td
              style={pressed(6 + 12 * 4) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(6 + 12 * 4)}
              onMouseUp={(e) => keyUp(6 + 12 * 4)}
              onMouseOut={(e) => keyUp(6 + 12 * 4)}
            ></td>
            <td
              style={pressed(8 + 12 * 4) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(8 + 12 * 4)}
              onMouseUp={(e) => keyUp(8 + 12 * 4)}
              onMouseOut={(e) => keyUp(8 + 12 * 4)}
            ></td>
            <td
              style={
                pressed(10 + 12 * 4) ? STYLE.keyBlackPress : STYLE.keyBlack
              }
              onMouseDown={(e) => keyDown(10 + 12 * 4)}
              onMouseUp={(e) => keyUp(10 + 12 * 4)}
              onMouseOut={(e) => keyUp(10 + 12 * 4)}
            ></td>
            <td style={STYLE.keyNo}></td>

            <td
              style={pressed(1 + 12 * 5) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(1 + 12 * 5)}
              onMouseUp={(e) => keyUp(1 + 12 * 5)}
              onMouseOut={(e) => keyUp(1 + 12 * 5)}
            ></td>
            <td
              style={pressed(3 + 12 * 5) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(3 + 12 * 5)}
              onMouseUp={(e) => keyUp(3 + 12 * 5)}
              onMouseOut={(e) => keyUp(3 + 12 * 5)}
            ></td>
            <td style={STYLE.keyNo}></td>
            <td
              style={pressed(6 + 12 * 5) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(6 + 12 * 5)}
              onMouseUp={(e) => keyUp(6 + 12 * 5)}
              onMouseOut={(e) => keyUp(6 + 12 * 5)}
            ></td>
            <td
              style={pressed(8 + 12 * 5) ? STYLE.keyBlackPress : STYLE.keyBlack}
              onMouseDown={(e) => keyDown(8 + 12 * 5)}
              onMouseUp={(e) => keyUp(8 + 12 * 5)}
              onMouseOut={(e) => keyUp(8 + 12 * 5)}
            ></td>
            <td
              style={
                pressed(10 + 12 * 5) ? STYLE.keyBlackPress : STYLE.keyBlack
              }
              onMouseDown={(e) => keyDown(10 + 12 * 5)}
              onMouseUp={(e) => keyUp(10 + 12 * 5)}
              onMouseOut={(e) => keyUp(10 + 12 * 5)}
            ></td>
            <td style={STYLE.keyNo}></td>
          </tr>
        </tbody>
      </table>
      <table align="center">
        <tbody>
          <tr>
            <td
              style={pressed(0 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(0 + 12 * 2)}
              onMouseUp={(e) => keyUp(0 + 12 * 2)}
              onMouseOut={(e) => keyUp(0 + 12 * 2)}
            ></td>
            <td
              style={pressed(2 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(2 + 12 * 2)}
              onMouseUp={(e) => keyUp(2 + 12 * 2)}
              onMouseOut={(e) => keyUp(2 + 12 * 2)}
            ></td>
            <td
              style={pressed(4 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(4 + 12 * 2)}
              onMouseUp={(e) => keyUp(4 + 12 * 2)}
              onMouseOut={(e) => keyUp(4 + 12 * 2)}
            ></td>
            <td
              style={pressed(5 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(5 + 12 * 2)}
              onMouseUp={(e) => keyUp(5 + 12 * 2)}
              onMouseOut={(e) => keyUp(5 + 12 * 2)}
            ></td>
            <td
              style={pressed(7 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(7 + 12 * 2)}
              onMouseUp={(e) => keyUp(7 + 12 * 2)}
              onMouseOut={(e) => keyUp(7 + 12 * 2)}
            ></td>
            <td
              style={pressed(9 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(9 + 12 * 2)}
              onMouseUp={(e) => keyUp(9 + 12 * 2)}
              onMouseOut={(e) => keyUp(9 + 12 * 2)}
            ></td>
            <td
              style={
                pressed(11 + 12 * 2) ? STYLE.keyWhitePress : STYLE.keyWhite
              }
              onMouseDown={(e) => keyDown(11 + 12 * 2)}
              onMouseUp={(e) => keyUp(11 + 12 * 2)}
              onMouseOut={(e) => keyUp(11 + 12 * 2)}
            ></td>

            <td
              style={pressed(0 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(0 + 12 * 3)}
              onMouseUp={(e) => keyUp(0 + 12 * 3)}
              onMouseOut={(e) => keyUp(0 + 12 * 3)}
            ></td>
            <td
              style={pressed(2 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(2 + 12 * 3)}
              onMouseUp={(e) => keyUp(2 + 12 * 3)}
              onMouseOut={(e) => keyUp(2 + 12 * 3)}
            ></td>
            <td
              style={pressed(4 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(4 + 12 * 3)}
              onMouseUp={(e) => keyUp(4 + 12 * 3)}
              onMouseOut={(e) => keyUp(4 + 12 * 3)}
            ></td>
            <td
              style={pressed(5 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(5 + 12 * 3)}
              onMouseUp={(e) => keyUp(5 + 12 * 3)}
              onMouseOut={(e) => keyUp(5 + 12 * 3)}
            ></td>
            <td
              style={pressed(7 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(7 + 12 * 3)}
              onMouseUp={(e) => keyUp(7 + 12 * 3)}
              onMouseOut={(e) => keyUp(7 + 12 * 3)}
            ></td>
            <td
              style={pressed(9 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(9 + 12 * 3)}
              onMouseUp={(e) => keyUp(9 + 12 * 3)}
              onMouseOut={(e) => keyUp(9 + 12 * 3)}
            ></td>
            <td
              style={
                pressed(11 + 12 * 3) ? STYLE.keyWhitePress : STYLE.keyWhite
              }
              onMouseDown={(e) => keyDown(11 + 12 * 3)}
              onMouseUp={(e) => keyUp(11 + 12 * 3)}
              onMouseOut={(e) => keyUp(11 + 12 * 3)}
            ></td>

            <td
              style={pressed(0 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(0 + 12 * 4)}
              onMouseUp={(e) => keyUp(0 + 12 * 4)}
              onMouseOut={(e) => keyUp(0 + 12 * 4)}
            ></td>
            <td
              style={pressed(2 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(2 + 12 * 4)}
              onMouseUp={(e) => keyUp(2 + 12 * 4)}
              onMouseOut={(e) => keyUp(2 + 12 * 4)}
            ></td>
            <td
              style={pressed(4 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(4 + 12 * 4)}
              onMouseUp={(e) => keyUp(4 + 12 * 4)}
              onMouseOut={(e) => keyUp(4 + 12 * 4)}
            ></td>
            <td
              style={pressed(5 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(5 + 12 * 4)}
              onMouseUp={(e) => keyUp(5 + 12 * 4)}
              onMouseOut={(e) => keyUp(5 + 12 * 4)}
            ></td>
            <td
              style={pressed(7 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(7 + 12 * 4)}
              onMouseUp={(e) => keyUp(7 + 12 * 4)}
              onMouseOut={(e) => keyUp(7 + 12 * 4)}
            ></td>
            <td
              style={pressed(9 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(9 + 12 * 4)}
              onMouseUp={(e) => keyUp(9 + 12 * 4)}
              onMouseOut={(e) => keyUp(9 + 12 * 4)}
            ></td>
            <td
              style={
                pressed(11 + 12 * 4) ? STYLE.keyWhitePress : STYLE.keyWhite
              }
              onMouseDown={(e) => keyDown(11 + 12 * 4)}
              onMouseUp={(e) => keyUp(11 + 12 * 4)}
              onMouseOut={(e) => keyUp(11 + 12 * 4)}
            ></td>

            <td
              style={pressed(0 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(0 + 12 * 5)}
              onMouseUp={(e) => keyUp(0 + 12 * 5)}
              onMouseOut={(e) => keyUp(0 + 12 * 5)}
            ></td>
            <td
              style={pressed(2 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(2 + 12 * 5)}
              onMouseUp={(e) => keyUp(2 + 12 * 5)}
              onMouseOut={(e) => keyUp(2 + 12 * 5)}
            ></td>
            <td
              style={pressed(4 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(4 + 12 * 5)}
              onMouseUp={(e) => keyUp(4 + 12 * 5)}
              onMouseOut={(e) => keyUp(4 + 12 * 5)}
            ></td>
            <td
              style={pressed(5 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(5 + 12 * 5)}
              onMouseUp={(e) => keyUp(5 + 12 * 5)}
              onMouseOut={(e) => keyUp(5 + 12 * 5)}
            ></td>
            <td
              style={pressed(7 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(7 + 12 * 5)}
              onMouseUp={(e) => keyUp(7 + 12 * 5)}
              onMouseOut={(e) => keyUp(7 + 12 * 5)}
            ></td>
            <td
              style={pressed(9 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite}
              onMouseDown={(e) => keyDown(9 + 12 * 5)}
              onMouseUp={(e) => keyUp(9 + 12 * 5)}
              onMouseOut={(e) => keyUp(9 + 12 * 5)}
            ></td>
            <td
              style={
                pressed(11 + 12 * 5) ? STYLE.keyWhitePress : STYLE.keyWhite
              }
              onMouseDown={(e) => keyDown(11 + 12 * 5)}
              onMouseUp={(e) => keyUp(11 + 12 * 5)}
              onMouseOut={(e) => keyUp(11 + 12 * 5)}
            ></td>

            <td style={STYLE.keyMargin}></td>
          </tr>
        </tbody>
      </table>
      {`${Object.keys(midiSounds)}`}
      {`${Object.values(midiSounds)}`}
      {/* <p ref={midiSounds}>{midiSounds.values}</p> */}

      <WrappedMIDISounds
        ref={midiSounds}
        instruments={[selectedInstrument]}
        {...pageProps}
      />
      {/* <MIDISounds
        style={{ display: 'none' }}
        ref={(ref) => (ref = midiSounds)}
        appElementName="__next"
        instruments={[selectedInstrument]}
      /> */}
    </div>
  )
}

Octave.getInitialProps = async (appContext) => {
  const { pageProps } = await Octave.getInitialProps(appContext)
  const { ctx } = appContext
  return { pageProps }
}

const WrappedMIDISounds = React.forwardRef(({ instruments }, ref) => {
  return (
    <MIDISounds
      style={{ display: 'none' }}
      ref={ref}
      appElementName="__next"
      instruments={instruments}
    />
  )
})
