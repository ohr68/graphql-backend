import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql"
import { IsAuth } from "../middlewares/auth.middleware"
import { IdeaModel } from "../models/idea.model"
import { IdeaService } from "../services/idea.service"
import { CreateIdeaInput } from "../dtos/input/idea.input"
import { GqlUser } from "../graphql/decorators/user.decorator"
import { User } from "@prisma/client"

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideaService: IdeaService = new IdeaService()

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg('data', () => CreateIdeaInput) data: CreateIdeaInput,
    @GqlUser() user: User
  
  ) : Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id)
  }
}