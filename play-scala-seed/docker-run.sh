docker run --rm \
	-d \
	-p 9000:9000 \
	-v /home/edge/dataviz/project-2023-la-vizta:/opt/docker/conf \
	dataviz-playground-api \
	-Dconfig.file=/opt/docker/conf/production.conf
