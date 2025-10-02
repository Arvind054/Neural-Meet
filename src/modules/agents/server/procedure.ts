import { db } from "@/DB";
import { agents } from "@/DB/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    // Get one
    getOne: protectedProcedure.input(z.object({id:z.string()})).query(async({input})=>{
        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));
        return existingAgent;
    }),
    //Get Many
    getMany: protectedProcedure.query(async()=>{
        const data = await db.select().from(agents);
        return data;
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async({input, ctx})=>{
      const [createdAgent] = await db.insert(agents)
      .values({
        ...input,
        userId: ctx.auth.user.id
      }).returning();
      return createdAgent;
    })
})