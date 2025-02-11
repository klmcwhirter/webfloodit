# webfloodit

Floodit as a web application

## Project Overview

webfloodit is a port of the floodit app as presented in chapter 8 of the [_Create Graphical User Interfaces with Python_](https://magpi.raspberrypi.com/books/create-guis) book from Raspberry Pi Press.

This port runs as:

- a web app using SolidJS
- nginx
- bundled and packaged into an OCI container image
- to be hosted in OMV on a Raspberry Pi using `docker compose`

## Build / Install

The build is automated in the [compose.yml](compose.yml) file.

This has 2 benefits:

- The app will be built on the target architecture in which it will eventually run.
- No image will need to be registered to Docker Hub, etc.

### Steps

1. stop running service
1. clone repo
1. from repo root dir: `docker compose build --no-cache`
1. start running service
