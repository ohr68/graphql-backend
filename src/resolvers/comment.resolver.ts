import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { IsAuth } from "../middlewares/auth.middleware";
import { CommentModel } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { CreateCommentInput } from "../dtos/input/comment.input";
import type { User } from "@prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => CommentModel)
@UseMiddleware(IsAuth)
export class CommentResolver {

  private commentService: CommentService = new CommentService()
  private ideaService: IdeaService = new IdeaService()
  private userService: UserService = new UserService()

  @Mutation(() => CommentModel)
  async createComment(
    @Arg('ideaId', () => String) ideaId: string,
    @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: User

  ): Promise<CommentModel> {
    return this.commentService.create(ideaId, user.id, data)
  }

  @FieldResolver(() => UserModel)
  async idea(@Root() comment: CommentModel): Promise<UserModel> {
    return this.ideaService.findIdeaById(comment.ideaId)
  }

  @FieldResolver(() => IdeaModel)
  async author(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.userService.findUser(comment.authorId)
  }

}