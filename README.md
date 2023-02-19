# best-nine

The backend consists on an api implemented with FastApi and containing a picked predicition model.

Running backend on docker:  
```
cd best-nine  
docker build -f Dockerfile.api -t best-nine-api .  
docker run --rm -p 5000:80 best-nine-api  
```

The api documentation can be found on http://0.0.0.0:5000/docs