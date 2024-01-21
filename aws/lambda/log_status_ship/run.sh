#!/bin/bash
sam build
sam local invoke LogStatusShip --event example.json