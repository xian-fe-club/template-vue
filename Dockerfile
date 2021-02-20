FROM alpine:3.5
ADD dist/index.html /data/index.html
CMD ["tail", "-f", "/dev/null"]
