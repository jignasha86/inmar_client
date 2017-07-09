# inmar_client

### This is frontend client based on angular js module ng-admin

## Pre-requisites
   Any web server

## Steps to Install using docker
  1) Install docker on your local machine
  2) create new directory eg mkdir test & go to new dir 
  3) run git clone to get source code of project
  4) copy Dockerfile from source code to outside
     eg **mv inmar_client Dockerfile ../**
  5) run **docker build -t apache .**
  6) run **docker run -p 3002:80 -dit --name apache apache2**
 
###  Open http://localhost:3002/ or http://{ip}:3002/ in browser
  


