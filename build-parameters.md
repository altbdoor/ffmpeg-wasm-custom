# Build parameters

| Flag                       | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| `--disable-everything`     | disable everything                              |
| `--enable-gpl`             | allow GPL-licensed libs (libx264)               |
| `--enable-libx264`         | use external libx264 instead of native h264     |
| `--enable-encoder=libx264` | h.264 encoder via libx264                       |
| `--enable-decoder=h264`    | h.264 decoder (for input mp4)                   |
| `--enable-parser=h264`     | h.264 bitstream parser                          |
| `--enable-demuxer=mov`     | mp4/mov demuxer (input container)               |
| `--enable-muxer=mp4`       | mp4 muxer (output container)                    |
| `--enable-protocol=file`   | read/write local files                          |
| `--enable-protocol=pipe`   | read/write stdin/stdout pipes (ffmpeg.wasm I/O) |
| `--enable-filters=...`     | see below                                       |

| Filter                         | Purpose                                                               | Example               |
| ------------------------------ | --------------------------------------------------------------------- | --------------------- |
| `buffer`                       | inject decoded video frames into filter graph                         | -                     |
| `buffersink`                   | extract filtered video frames from filter graph                       | -                     |
| `format`                       | convert pixel format                                                  | `-pix_fmt yuv420p`    |
| `scale`                        | resize video frames                                                   | `-vf scale=1280:720`  |
| `trim`                         | trim video by duration/start time                                     | `-t 10`, `-ss 5`      |
| `null`                         | internal passthrough                                                  | -                     |
| `transpose,hflip,vflip,rotate` | transpose for 90/270, hflip+vflip for 180, rotate for arbitrary angle | default `-autorotate` |
