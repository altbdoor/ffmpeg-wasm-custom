# ffmpeg-wasm-custom

Just personal build of <https://github.com/ffmpegwasm/ffmpeg.wasm>, based on v12.15.

### Changes (in no particular order)

- Copied over [original Dockerfile](https://github.com/ffmpegwasm/ffmpeg.wasm/blob/v12.15/Dockerfile) from FFmpeg WASM
- Upgraded to `emscripten/emsdk@5.0.7` and `FFmpeg/FFmpeg@5.1.9`
- Disabled everything, only enabled x264, and dropped libraries
  - See [`build-parameters.md`](./build-parameters.md).
- Use [latest stable x264 from Git repo](https://code.videolan.org/videolan/x264/-/tree/stable?ref_type=heads)
  - The repo is protected with [Anubis](https://anubis.techaro.lol/), so `curl` and `git` commands do not work
  - As of 8 June 2026, the code snapshot is downloaded as `x264-b35605ac.tar.gz`

### References

- https://github.com/ffmpegwasm/ffmpeg.wasm/issues/866
- https://ffmpegwasm.netlify.app/docs/contribution/core/#custom-build--reduce-build-size
- https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu
- https://gist.github.com/omegdadi/6904512c0a948225c81114b1c5acb875
