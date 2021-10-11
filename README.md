[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Actions Status](https://github.com/okonech/mtg-react-redux/workflows/Node%20CI/badge.svg)](https://github.com/okonech/mtg-react-redux/actions)

An MTG Web app player using firebase as a back end and firebase cloud messaging for updating game state when players act.
This is intended to maximize free tier usage, and there is currently no limit to Firebase Cloud Messaging usage.

Each game subscribes to a new channel unique to the specific game, and back end state changes are pushed to each player. They must perform GET requests with their player secret in order to retrieve private game information.

Coded in Node + React + Redux using a monorepo. Class modules are used to share code between front and back ends.



TODO:

hover over playerinfo will show commander tax and commander damage


For dropping cards with a position, drop all with the mouse coord.
    have a middleware to properly adjust coords of each specific card


look into svg sprites for the mana symbols - retrieve from scryfall

fix material ui imports to specific paths rather than from core

make all hocs omit wrapped props. Copy react-redux's connect function


calculate proper top height for cards and stop using vh. Then have top level listener (players) listen for window resize and  adjust card size

Profile
let users edit username on profile page. Signup with google should set displayname as username.
preferences:
    Let users choose preferred layout for 3 and 4 player games

Game state: must have local option for loading entire replay.
See about saving off firebase cloud messages for proper replay stuff- it allows for player only or judge style replays
