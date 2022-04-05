#!/bin/sh

echo 'Deleting old javascript output files...'
rm js/*.js

echo 'Compiling typescript modules...'
tsc

if [ $? -ne 0 ] ; then
	echo 'Failed to compile the typescript modules. Please report the bug to https://github.com/rxtthin/maciejniziolek.xyz/issues'
else
	echo 'Typescript modules compiled successfully.'
fi

echo 'Updating switchracer...'
if [ -d 'switchracer' ]
then
	cd switchracer
	git pull
	rm -rf ts
	cd ..
else
	git clone https://github.com/rxtthin/switchracer
	rm -rf switchracer/ts
	cd ..
fi
