#!/bin/bash
npm run build
cp ./app/dest/renderLambda.js ./renderLambda/dest/
cd ./renderLambda
zip -r ../renderLambda.zip .
cd ..
aws s3 cp ./app/dest/client.js s3://asdsgn.net/client.js
aws lambda update-function-code --function-name apiTest --zip-file fileb://renderLambda.zip --publish
