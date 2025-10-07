
***

# Project Name: Products and Segments Microservices

## Overview
This repository contains two distinct microservices responsible for managing Products and Segments management APIs. Each microservice serves specific business domains but together form the backend for product data management and segment evaluation functionalities.

***

## Microservice 1: Products Service
`check backend/products README.md for more info`
***

## Microservice 2: Segments Service
`check backend/segments README.md for more info`
***

### Repository Structure

The repository can be two separate folders or repositories, one for each microservice, each with their own `package.json`, `Dockerfile`, and configs.

### Development Tips

- Use `.env` files for local secrets, keep `.env` out of version control.
- Use Docker Compose to spin up multi-container environments interfacing both services with MongoDB or other shared infrastructure.
- Ensure consistent Node.js and npm versions across services.

***
