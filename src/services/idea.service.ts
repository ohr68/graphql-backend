import { prismaClient } from "../../prisma/prisma";
import type { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";

export class IdeaService {
  async createIdea(data: CreateIdeaInput, authorId: string) {
    return prismaClient.idea.create({
      data: ({
        title: data.title,
        description: data.description,
        authorId: authorId
      })
    })
  }

  async updateIdea(id: string, data: UpdateIdeaInput) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id
      }
    })

    if (!idea) throw new Error('Ideia não encontrada')

    return prismaClient.idea.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description
      }
    })
  }

  async deleteIdea(id: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id
      }
    })

    if (!idea) throw new Error('Ideia não encontrada')

    return prismaClient.idea.delete({
      where: { id }
    })
  }

  async findIdeaById(id: string) {
    return prismaClient.idea.findUnique({
      where: {
        id
      }
    })
  }

  async listIdeas() {
    return prismaClient.idea.findMany()
  }
}