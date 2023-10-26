# webfloodit

Floodit as a web application

## Project Overview

webfloodit is a port of the floodit app as presented in chapter 8 of the _Create Graphical User Interfaces with Python_ book from Raspberry Pi Press.

This port runs as:

- a web app using SolidJS
- nginx
- bundled and packaged into an OCI container image
- to be hosted in OMV6 on a Raspberry Pi using docker-compose

## Install

1. `npm run build`
1. `docker build -t klmcwhirter/webfloodit:latest .`
1. Assure docker registry configuration
1. `docker push` to registry
1. `docker pull` as appropriate
