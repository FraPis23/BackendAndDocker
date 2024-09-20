cd docker
./build.sh

cd ..

docker run -it --rm \
	--name warehouse_server --net host --ipc host --privileged \
	-v $(pwd):/home/warehouse \
	-w /home/warehouse \
	warehouse:base bash -c "chmod +x run_index.sh && ./run_index.sh"