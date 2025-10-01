import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/DB";
import * as schema from '../DB/schema'
export const auth = betterAuth({
      emailAndPassword: { 
    enabled: true, 
  }, 
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema:{
            ...schema
        }
    }),
});