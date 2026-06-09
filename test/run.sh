#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")"

if [[ ! -d dist ]]; then
  echo "Setting up WASM ffmpeg files..."
  mkdir dist
  cp -r ../packages/core/dist/umd/* dist/
fi

if [[ ! -d ffmpeg ]]; then
  echo "Setting up UMD ffmpeg files..."
  mkdir ffmpeg
  cdn_url="https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15"
  curl -sO --output-dir ffmpeg "${cdn_url}/dist/umd/814.ffmpeg.js"
  curl -sO --output-dir ffmpeg "${cdn_url}/dist/umd/ffmpeg.js"
fi
