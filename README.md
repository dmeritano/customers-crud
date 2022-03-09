## CUSTOMER-CRUD

`React` application that simulates a customer CRUD, using `json-server` as backend. Application structure created with `Vite`

## App insights

* React **v17**
* React Router Dom **v6**
* Formik + Yup
* TailwindCSS


---
Live Demo(*) [Here](https://dmeritano-customers-crud.netlify.app)

> * Data: loaded from db.json file in this proyect
> * Limitations: `json-server` deployed in `https://my-json-server.typicode.com` simulate data modification for create, update, delete operations. 

### Environment variables used
> * *VITE_CUSTOMERS_API_URL* = `http://url-to-customers-api`


### json-server 

Para usar json-server localmente, hacer los siguiente:

```properties
   npm install -g json-server
   echo {\"customers\":[]}
   json-server --watch db.json --port 4000
```


