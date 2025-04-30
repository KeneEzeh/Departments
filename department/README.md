
# BACKEND SETUP 
# Department API (GraphQL)

This is a GraphQL API built with NestJS, TypeORM, and Apollo Server. It manages departments and users, supporting queries, mutations, and pagination.

---

## Technologies

- NestJS
- GraphQL (code-first)
- TypeORM
- PostgreSQL / CockroachDB



## Project setup

```bash
$ cd department
$ npm install -g @nestjs/cli && npm install --legacy-peer-deps
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQl Queries/Mutations Samples

### SignUp

```
mutation Signup {
    signup(input: {email: "johndoe@gmail.com", password: "mypassword", username: "John-Doe"}) {
        id
        email
        username
    }
}
```

### Login

```
mutation Login {
    login(loginUserInput: { email: "johndoe@gmail.com", password: "mypassword" }) {
        access_token
    }
}
```

### Get Departments
```
query GetDepartments {
    getDepartments {
        id
        name
        subDepartments {
            id
            name
        }
    }
}
```

### Create Department

```
mutation CreateDepartment {
    createDepartment(input: {name: "My Department", subDepartments: [{name: "My SubDepartment"}]}) {
        id
        name
        subDepartments {
            id
            name
        }
    }
}

```

### Update Department

```
mutation UpdateDepartment {
    updateDepartment(id: "72636738288", input: {name: "My Department", subDepartments: [{name: "My SubDepartment"}]}) {
        id
        name
    }
}
```

### Delete Department

```
mutation DeleteDepartment {
    deleteDepartment(id: "82736477388")
}
```


## Environment Variables

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
JWT_SECRET=
NODE_ENV=
