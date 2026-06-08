# ffmpeg-wasm-custom

Just personal build of <https://github.com/ffmpegwasm/ffmpeg.wasm>, based on v12.15.

### Changes (in no particular order)

- Copied over [original Dockerfile](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/v12.15/Dockerfile) from FFmpeg WASM
- Upgraded `emscripten/emsdk` and FFmpeg to the latest patch
- Disabled everything, and only enabled x264

### References

- https://github.com/ffmpegwasm/ffmpeg.wasm/issues/866
- https://ffmpegwasm.netlify.app/docs/contribution/core/#custom-build--reduce-build-size
- https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu
- https://gist.github.com/omegdadi/6904512c0a948225c81114b1c5acb875
