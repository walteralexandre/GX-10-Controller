# GX-10 Controller

This project is a work in progress. **Use it at your own risk.**

[Access the GX-10 Controller](https://walteralexandre.github.io/GX-10-Controller/)

- No installation or configuration required.
- No account required.
- Your browser must support Web MIDI.
  - If your current browser does not support Web MIDI, please use another browser.

## Notes

- Click **Disconnect** before turning off your pedalboard or unplugging the USB cable. This helps prevent your Chromium based browsers from freezing.


## Change log

v0.11.3 (2026-11-03)

- control: rows in the pedal's own order, only the functions the GX-10 offers for each
  footswitch, mode only on the functions that switch something on and off, and the rows
  the current control mode is not using are greyed out
- assign: the six pages of the pedal's own table; the block column lists the effects that
  are in this preset by name, and the parameter column only the parameters of that effect
  (ON/OFF included)
- knob: same block and parameter lists as assign
- MIDI: one row per setting with a slider, in the pedal's order
- changes made on the pedal now show up in the open CTL/EXP dialog
- DIV and MIX have no on/off any more (they are always on), and the chain greys out the
  channel the divider is not sending the signal to
- the overwrite warning is amber instead of red

v0.11.2 (2026-10-08)
- current preset number and name shown above the effect chain
- presets list: factory tab fixed, names kept in the browser between visits,
  "Read names again" button, moved up in the menu
- assign settings are now written as a whole block, which is what the pedal accepts
- the page warns when js/gx10.ctlexp.js is older than index.html instead of failing silently

v0.11.1 (2026-10-08)
- presets list added (user and factory), click to load
- knob and memory MIDI settings added
- control function dialog: correct GX-10 names (WAH, DOWN/UP, BANK), mode shown only
  for the functions that switch something on and off, MEMORY/SYSTEM preference
- every CTL/EXP write is now read back and reported when the pedal refuses it
- Roboto and Roboto Mono bundled with the page; CSS tidied with variables

v0.11.0 (2026-10-07)
- control functions added
- assign functions added

v0.10.2 (2026-10-06)
- save and export functions fixed
- randomize function created
- import funcion created

v0.10.1 (2026-10-05)
- save and export functions created

older
- edit the chain fx

