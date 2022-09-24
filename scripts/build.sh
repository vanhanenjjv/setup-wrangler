#!/bin/bash

rm -rf ./dist/
mkdir ./dist
cp action.yml ./dist/
webpack
