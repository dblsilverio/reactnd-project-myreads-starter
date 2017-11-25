# MyReads Project Setup Guide

The following sections will describe how to obtain, build and serve this project.

## Obtain the Source

### Cloning

Just issue a git clone `git clone https://github.com/diogosilverio/reactnd-project-myreads-starter.git`

A folder with the project name will be created with all contents from the project master branch.

### Downloading Zip

Download a zip package with master branch source from `https://github.com/diogosilverio/reactnd-project-myreads-starter/archive/master.zip`

Uncompress it to a folder of your choice.

## Building

Follow the steps below to a succeful buiding process:

* Access your `reactnd-project-myreads-starter` folder
* Install all packages with `npm install`
* Build the project to production with `npm run build`
* The folder `/build` now contains all files minified and correctly bundled

Test the build with `serve` package by installing it: `sudo npm install -g serve` and running `serve -s build` from the project's root path.

You will be able to access the project through `http://localhost:5000` or yout local network ip followed by port 5000.

## Sending to Production

Pack you `/build` folder and allocate it at your servers properly, then access it from your production URL.
