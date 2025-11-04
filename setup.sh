#!/bin/bash

# This script automates the setup process for the Skill Sum game.

# 1. Install dependencies
npm install

# 2. Copy the environment file
cp .env.example .env.local

echo "The project has been successfully set up. Please add your Gemini API key to the .env.local file."
