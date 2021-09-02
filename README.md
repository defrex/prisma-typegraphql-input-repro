# prisma-typegraphql Input Validation Error Reproduction

Given a simple model

```prisma
model Post {
  id    Int    @id @default(autoincrement())
  title String
}
```

and a simple string length validation decorator from `class-validator`

```typescript
applyInputTypesEnhanceMap({
  PostCreateInput: {
    fields: {
      title: [MinLength(10)],
    },
  },
});
```

I would expect the following mutation to return an error.

```graphql
mutation CreatePost {
  createPost(data: { title: "notten" }) {
    id
  }
}
```

It does not.

#### Steps to Reproduce

```sh
git clone git@github.com:defrex/prisma-typegraphql-input-repro.git
cd prisma-typegraphql-input-repro

npm install
npm start
```
