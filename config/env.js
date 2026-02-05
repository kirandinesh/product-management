import dotenv from "dotenv";
import { z } from "zod";

//configure dotenv
dotenv.config();

const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_HOST: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
  })
  .parse(process.env);

export default env;
