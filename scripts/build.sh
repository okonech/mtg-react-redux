#! /bin/bash

set -o errexit  # exit on errors
set -o nounset  # exit on use of uninitialized variable
set -o pipefail # exit when any part of a pipe fails

lerna bootstrap --ci
lerna run build --stream --scope={@mtg-react-redux/client,@mtg-react-redux/backup-restore-fb,@mtg-react-redux/tests}