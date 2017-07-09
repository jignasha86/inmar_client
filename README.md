# inmar_client

### This is frontend client based on angular js module ng-admin

## Pre-requisites
   Any web server

## Steps to Install using docker
  1) Install docker on your local machine
  2) create new directory eg mkdir test & go to new dir 
  3) run git clone https://github.com/jignasha86/inmar_client.git
  4) copy Dockerfile from source code to outside
     eg **mv inmar_client Dockerfile ../**
  5) run **docker build -t apache .**
  6) run **docker run -p 3002:80 -dit --name apache apache**
 
###  Open http://localhost:3002/ or http://{ip}:3002/ in browser
  


