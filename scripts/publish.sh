#! /bin/bash

# Root directory of project
ROOT_DIR=$(readlink -f .)

# =====
# Source: https://gist.github.com/aguy/2359833

set -o errexit  # exit on errors
set -o nounset  # exit on use of uninitialized variable
set -o errtrace # inherits trap on ERR in function and subshell
set -o pipefail # exit when any part of a pipe fails
# =====

bash scripts/check-node-version-mismatch.sh

watchPackage() {
    lerna bootstrap --ci
    lerna run build-ci --stream --scope @meditech/webapi-server --scope @meditech/native-handler-dev
    lerna run watch --stream --scope @meditech/$PACKAGE_NAME
}

checkPackage() {
    case "$PACKAGE_NAME" in
        cp|cloud-platform)
            PACKAGE_NAME="cloud-platform"
            ;;
        sm|subscription-messaging)
            PACKAGE_NAME="subscription-messaging"
            ;;         
    esac   
    
    echo Checking that package - $PACKAGE_NAME - exists...
    if [ ! -d "$ROOT_DIR/packages/$PACKAGE_NAME" ]; then
        echo Package does not exist.
        exit 1
    fi
}

displayHelp() {

    cat << EOF
Help:
Publish modules and packages at the next logical conventional version

Options:
    -r, --rc               Next rc prerelease

    -s --stable            Next stable release, graduating all prereleases to stable

EOF
}

while [[ $# -gt 0 ]]
do
key="$1"
# shifts to skip ... --{arg} {val} ...
case $key in
    -p|--pkg)
        if [ "$2" == "" ]; then
            echo ERROR - expected package name after "-p".
            displayHelp
            exit 1
        fi
        
        PACKAGE_NAME="$2"
        checkPackage
        shift
        shift
        ;;
    -h|--help)
        displayHelp
        exit 0
        ;;
    *)
        echo ERROR - unknown option: $key
        displayHelp
        exit 5
esac
done

watchPackage

exit 0