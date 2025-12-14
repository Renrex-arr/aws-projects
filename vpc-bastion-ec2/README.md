
# VPC and Bastion EC2 Project

## Overview
Creating a Bastion host, which is a special purposed server configured to work against attacks or threats. It acts a proxy server for clients to connect to remote server.
Using Virtual Private Connections in AWS to create a private subnet, bastion acts as a gateway against the public internet. EC2 instances are set up in the private subnet, with a public Igw facing special EC2 acting as bastion.

## Architecture Diagram

## Tech Stack
AWS Account
AWS VPC, EC2 
SSH protocol

## Design
The project uses a simple two-tier VPC design:

- Public subnet hosting a Bastion EC2 with internet access

- Private subnet hosting an internal EC2 with no public exposure.
  
Security groups restrict access so only the Bastion can reach the private instance.
This design follows AWS best practices for secure administration.

## Implementation Steps
1) VPC Setup: Created a VPC with 10.0.0.0/16 and added public + private subnets.

2) Routing: Attached an Internet Gateway and configured route tables so only the public subnet has internet access.

3) Bastion Host: Launched a Bastion EC2 in the public subnet and restricted SSH access to my IP.

4) Private EC2: Launched an internal EC2 in the private subnet with a security group allowing SSH only from the Bastion SG.

Secure Access: SSH'd into the Bastion Host, then into the private instance using its private IP.

## Results
- Successfully created a Bastion Host as a secure gateway.
- Private EC2 instances remain inaccessible from the public internet.
- Verified secure access using SSH from the Bastion Host.

## Challenges / Learnings
- Designing VPC subnets and assigning IP addresses was initially confusing.
- Learned proper usage of SSH keys:
  - Public key on the Bastion.
  - Private key used to connect from Bastion to private instance.
  - Learned the importance of securing private keys while testing connectivity.
## Future Improvements
- Automate deployment using Terraform or CloudFormation.
- Implement AWS Systems Manager Session Manager to eliminate the need for storing private keys on the Bastion.
- Add monitoring and logging for Bastion access.
- Implement multi-AZ architecture for higher availability.
## References
AWS Docs
