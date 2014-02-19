#!/bin/bash

LOGFILE="daemon.log"
RUNFILE="rbp.pid"

ARGS=$(getopt -o k -l kill -n "dev.sh" -- "$@");

if [ $? -ne 0 ]; then
    exit 1;
fi

eval set -- "$ARGS";

while true; do
    case "$1" in
        -k|--kill)
            kill $(cat "$RUNFILE");
            rm "$RUNFILE";
            exit;
            ;;
        --)
            if [ -f "$RUNFILE" ]; then
                echo "already running, PID: $(cat $RUNFILE)";
                exit 1;
            fi

            touch $LOGFILE;
            grunt livereload > $LOGFILE 2>&1 &
            echo -n "$! " > $RUNFILE
            grunt server > $LOGFILE 2>&1 &
            echo "$!" >> $RUNFILE
            break;
            ;;
    esac
done

# KILL
