# User Api
Hello, welcome to your on Our File uploadint to Local and Aws S3 Bucket.

## Instructions to install Project setup
```
1) git clone https://github.com/dev363/node-curd.git
2) npm install
3) cd image-upload-multer
4) node app.js (To save files at Local)
4) node app-s3.js (To save files at S3 Bucket)
```

### Request
```
curl -X POST \
  http://localhost:3000/profile \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -H 'postman-token: 899ccb07-2dde-c5de-bf6f-6270cdcc5ad0' \
  -F avatar=@0.png
```