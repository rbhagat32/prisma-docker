# Steps to use Prisma

1. Initialize Prisma in your project:

```bash
npx prisma init --datasource-provider postgresql
```

2. Configure your database connection in the `.env` file:

```env
DATABASE_URL=<your_database_url>
```

3. Define your data model in the `prisma/schema.prisma` file:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    String @id @default(uuid())
  email String @unique
  name  String
}
```

4. Run the following command to generate the Prisma Client:

```bash
npx prisma generate
```

5. Run the following command to create Database migration:

```bash
npx prisma migrate dev --name init
```

6. Use the Prisma Client in `src/config/prisma.ts` file:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma
  .$connect()
  .then(() => {
    console.log("Connected to PostgreSQL !");
  })
  .catch((e) => {
    console.error("Error connecting to PostgreSQL", e);
    process.exit(1);
  });

export { prisma };
```
