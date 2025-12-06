# Hosting a static webpage on AWS using S3

## Overview
AWS S3 is an object-storage with a simple web service interface to store and retrieve any amount of data from anywhere on the web. 

## Tech Stack
HTML/CSS
Amazon S3 (Static website hosting

## Design
A simple personal portfolio page with:
Basic layout and text
Minimal styling 
Plans to expand design and functions later

## Implementation

### Steps

1)Sign into AWS console and open Amazon S3.
1) Create a S3 bucket
   -Bucket name must be globally unique.
   -Only lowercase 3-63 characters with dots, numbers and hyphens allowed.
   -Disabled "Block all public access"
   -Choose among encryption options; SSE-S3, SSE-KMS, DSSE-KMS (Default SSE-S3 is fine)
   -Create bucket
   -Upload your files to this bucket with "Add files". Ensure to upload all in the same root folder.

2)Enable static web hosting
   -Locate your bucket under General purpose buckets.
   -Under properties tab, scroll down to Static web hosting section and edit.
   -Choose "Use this bucket to host a webstie" and enable it.
   -Enter your index.html file, error document and other JSON redirection links and save changes.
   
4) At bottom of the page you can find the endpoint for your bucket.
    -You can paste this link on a browser to test, but it will say "Access denied", as we have not set a bucket         policy yet

7) Add a bucket content policy
   -Under Permissions of your bucket, select edit under Bucket Policy
   -Here you can grant read access for your website with the following policy:
   ```
    {
    "Version": "2012-10-17",		 	 	 
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::Bucket-Name/*"
            ]
        }
      ]
    }
   ```
    -Under Resource, add your bucket name and save changes.
   
8)Test your endpoint 
    -The endpoint link for your bucket can now display.
    -It should render the index.html file entered and associated files.
    -Billing will incur depending on the amount of requests and responses to this bucket enpoint as per S3 billing policy.
    
9)Clean up
    -You can re-enable "Block public access" again to stop requests charges when not using the website to minimize costs.


## Results
Succesfully created a S3 bucket and hosted a public read access webpage.
Understood basic AWS S3 bucket policies and endpoint managment.
More confident to expand website and explore more aws services.

## Notes
-Billing on AWS free tier account is capped to allow exploring services for educative purposes, without incurring any additional bills for S3 storage: free 20,000 GET requests + 2000 PUT/POST/DELETE/OTHER and 5GB storage.
-You may see a surpisingly high amount of requests (mine was ~93 GETs) even of a simple static server, this is due to the requirments for AWS to set the bucket enpoint and is normal.



## References
https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html
