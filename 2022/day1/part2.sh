#!/bin/bash

cat input | paste -sd+ - | sed 's/++/\n/g' | bc | sort -n | tail -n 3 | paste -sd+ - | bc