#!/bin/bash

if [ ! -d "$PWD/python3-virtualenv" ]; then
    echo "Error: directory '$PWD/python3-virtualenv' is missing. Did you forget to create a virtual environment?"
    exit 1
elif [ ! -d "tests" ]; then
    echo "Error: directory 'tests' is missing. Ensure your test directory is named '/tests'!"
    exit 1
fi

$PWD/python3-virtualenv/bin/python -m unittest discover -v tests/