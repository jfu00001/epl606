#!/usr/bin/env bash

nohup python datacollector.py &
nohup python extratree.py &
nohup python randomforest.py &