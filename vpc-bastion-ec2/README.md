
# VPC and Bastion EC2 Project

## Overview
Using AWS Virtual Private Network and EC2 instances to create a bastion structure for controlled and secure routing.

## Architecture Diagram

## Tech Stack
AWS Account
AWS VPC, EC2 

## Design
The project uses a simple two-tier VPC design:

- Public subnet hosting a Bastion EC2 with internet access

- Private subnet hosting an internal EC2 with no public exposure.
  
Security groups restrict access so only the Bastion can reach the private instance.
This design follows AWS best practices for secure administration.

## Implementation Steps
1) VPC Setup: Created a VPC with 10.0.0.0/16 and added public + private subnets.

Routing: Attached an Internet Gateway and configured route tables so only the public subnet has internet access.

Bastion Host: Launched a Bastion EC2 in the public subnet and restricted SSH access to my IP.

Private EC2: Launched an internal EC2 in the private subnet with a security group allowing SSH only from the Bastion SG.

Secure Access: SSH'd into the Bastion Host, then into the private instance using its private IP.

## Results

## Challenges / Learnings

## Future Improvements

## References
