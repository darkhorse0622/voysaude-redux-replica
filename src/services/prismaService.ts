import { prisma } from '@/lib/prisma'
import type { SurveyResponse, Prisma } from '@prisma/client'

export class PrismaService {
  // Survey operations
  static async createSurveyResponse(data: {
    user_id: string
    form_id: string
    form_title?: string
    responses?: Prisma.JsonValue
    metadata?: Prisma.JsonValue
    submitted_at?: Date
  }): Promise<SurveyResponse> {
    return prisma.surveyResponse.create({
      data: {
        ...data,
        responses: data.responses || {},
        metadata: data.metadata || {}
      },
    })
  }

  static async getSurveyResponsesByUser(userId: string): Promise<SurveyResponse[]> {
    return prisma.surveyResponse.findMany({
      where: { user_id: userId },
      orderBy: { submitted_at: 'desc' },
    })
  }

  static async getSurveyResponseById(id: string): Promise<SurveyResponse | null> {
    return prisma.surveyResponse.findUnique({
      where: { id },
    })
  }

  static async updateSurveyResponse(id: string, data: Partial<Omit<SurveyResponse, 'id' | 'user_id' | 'created_at'>>): Promise<SurveyResponse> {
    return prisma.surveyResponse.update({
      where: { id },
      data,
    })
  }

  static async deleteSurveyResponse(id: string): Promise<void> {
    await prisma.surveyResponse.delete({
      where: { id },
    })
  }

  // Utility operations
  static async disconnect(): Promise<void> {
    await prisma.$disconnect()
  }
}