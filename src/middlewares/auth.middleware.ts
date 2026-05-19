import type { Middleware } from "type-graphql/build/typings/typings/middleware";
import type { GraphqlContext } from "../graphql/context";

export const IsAuth: Middleware<GraphqlContext> = async ({ context }, next) => {
  if (!context.user) throw new Error('Usuário não autenticado!')

  return next()
}