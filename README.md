
# Readme
## Build

```
./build.sh
```

## Test on local machine
1. Execute in terminal:
```
./build.sh
cd build_keycloak
./start_keycloak_testing_container.sh 
```

2. open http://localhost:8080 in browser
3. login to admin console using admin:admin
4. create a new realm, enable register, forgot password and remember me
5. navigate to signin page: (Example) http://localhost:8080/realms/${REALM_NAME}/login-actions/authenticate

