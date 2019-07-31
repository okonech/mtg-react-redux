[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

TODO:

have avatar be commander or commanders (2 halves, both vertical) and have this drag out the commander card if in cmder zone
hover over will show commander tax and commander damage

convert actions to typesafe actions
https://github.com/piotrwitek/typesafe-actions#tutorial

For dropping cards with a position, drop all with the mouse coord.
    have a middleware to properly adjust coords of each specific card


deck editor:
    iframe on left with scryfall search
        this is in a drawer and can maybe also have a typeahead search
    drag the result images to the deck editor and it adds the card to the deck


Give each player an outline color, so cards on the stack are outlined with that player's color

look into svg sprites for the mana symbols
already have the sprite sheet

fix material ui imports to specific paths rather than from core

fix selectable module selectcontext, source-map-explorer has it as over 1mb

make all hocs omit wrapped props. Copy react-redux's connect function

fix actions in new style and use typeof on functions
