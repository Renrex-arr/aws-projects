# Discord Bot on AWS (ECS + CI/CD)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitLab CI](https://img.shields.io/badge/GitLab%20CI-FCA121?style=for-the-badge&logo=gitlab&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)



---

## Overview
This project is a **cloud-hosted Discord bot built with JavaScript using the `discord.js` framework**, deployed on **AWS ECS (Fargate)** with a **fully automated CI/CD pipeline**.

The bot responds to commands, slash commands, and can fetch images from external APIs. Every commit pushed to the `main` branch triggers a **GitLab CI/CD pipeline** that builds a Docker image, pushes it to **Amazon ECR**, and updates the running ECS service via **AWS CLI**.

This project demonstrates **AWS container orchestration, CI/CD automation, and production-ready DevOps practices**.

---

## Features
- 🤖 Discord bot built with **discord.js**
- 💬 Supports message commands and slash commands
- 🌐 Fetches images from external APIs
- 🐳 Dockerized for consistent deployments
- 🔄 Fully automated CI/CD on every commit to `main`
- 🚀 Runs on **Amazon ECS Fargate**
- 📦 Container images stored in **Amazon ECR**
- 📜 Application logs available via **CloudWatch Logs**

---

## Architecture
**Deployment flow:**

1. Push code to the `main` branch in GitLab  
2. GitLab CI pipeline triggers automatically  
3. Docker image built via `buildspec.yml`  
4. Image tagged and pushed to Amazon ECR  
5. ECS task definition updated using AWS CLI  
6. ECS Fargate service pulls the new image and restarts
7. Terraform Iac to manage and maintain services


---

## Tech Stack
- **Language / Framework**: JavaScript, discord.js  
- **Containerization**: Docker  
- **Cloud (AWS)**: ECS (Fargate), ECR, IAM, CloudWatch Logs  
- **CI/CD**: GitLab CI, buildspec.yml, AWS CLI
- **Iac**: Terraform

---

## CI/CD Pipeline
Automated deployment pipeline includes:

- Authenticate to Amazon ECR  
- Build Docker image  
- Tag and push image to ECR  
- Update ECS task definition via AWS CLI  
- Restart ECS Fargate service with new image
- Terraform to regulate the services and maintain Iac.

> **Outcome:** Fully automated, zero-manual deployments on every commit.

---

## Configuration & Secrets
- Uses `.env` for local development  
- Supports AWS Secrets Manager for production-grade secrets  
- Discord bot token is never hardcoded  

---

## What This Project Demonstrates
- AWS ECS Fargate service management  
- Docker image lifecycle with Amazon ECR  
- GitLab CI/CD automation  
- AWS CLI–based infrastructure updates  
- Production-style logging via CloudWatch
- Iac using terraform for AWS services

---

## Future Improvements
- Expand slash command functionality  
- Fully integrate AWS Secrets Manager  
- Add monitoring, alerts, and metrics  
- Blue/green or rolling deployments  

---

### Resume Bullet
> Built and deployed a Dockerized Discord bot using **AWS ECS (Fargate)** and **Amazon ECR**, with a **GitLab CI/CD pipeline** that automatically builds, pushes, and deploys container updates on every commit.

