import { prismaClient } from "../../prisma/prisma";
import type { CreateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
  async create(
    ideaId: string,
    authorId: string,
    data: CreateCommentInput
  ) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id: ideaId
      }
    })

    if (!idea) throw new Error('Ideia não encontrada')

    return prismaClient.comment.create({
      data: {
        ideaId,
        authorId,
        content: data.content
      }
    })
  }

  async listCommentsByIdea(ideaId: string) {
    return prismaClient.comment.findMany({
      where: {
        ideaId
      }
    })
  }
}