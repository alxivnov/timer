# Timer

Markdown timer

```shell
docker run \
	--log-driver local \
	--name timer-9998 \
	--publish=9998:8000 \
	--volume ~/Documents/timer:/usr/src/app \
	--workdir /usr/src/app \
	--detach \
	--interactive \
	--tty \
	php:5-alpine \
	php -S 0.0.0.0:8000
```