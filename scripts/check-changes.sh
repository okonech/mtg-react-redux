#! /bin/bash

set -o errexit  # exit on errors
set -o nounset  # exit on use of uninitialized variable
set -o pipefail # exit on pipe failure

# =============================================================================
# Assumes the current working directory is the root of a package.
# The first, and only, argument is the command to execute if changes are
#   detected. When running a build in Docker, we'll always have a
#   clean build, so there's no need to check git.
# =============================================================================

# currently checked out revision
CURR=$(git rev-parse HEAD)
# target path, relative to the root of the project
TARGET=$(realpath --relative-to=../../ "$(pwd)")

echo Checking for changes in \"$TARGET\" since revision $CURR...

if [ "${FORCE-}" != "" ]; then
    echo FORCE has been set. Build will proceed.
    EXEC=1
elif [ -f last-ci-change ]; then
    
    # the revision number of the last successful build of this package
    LAST=$(cat last-ci-change)
    # count the number of changes, within the current directory
    CHGS=$(git diff --name-only $LAST -- . | wc -l)

    if [ $CHGS -gt 0 ]; then
        echo $CHGS changes found in \"$TARGET\" since last build. Build will proceed.
        EXEC=1
    elif [ "${JENKINS_HOME:-0}" != "0" ]  && [ "$LAST" == "$CURR" ]; then
        echo No changes found in \"$TARGET\" since last build, but this appears to be a manual build. Build will proceed.
        EXEC=1
    else
        echo No changes found in \"$TARGET\" since last build. Build will be skipped.
        EXEC=0
    fi

    # cleanup the file so that, if the build fails, we make a clean build
    rm -f last-ci-change
else
    echo This is the first build.
    EXEC=1
fi

if [ $EXEC -gt 0 ]; then
    eval $1
fi

# Do this last because we only want to update the file on a successful build.
git rev-parse HEAD > last-ci-change