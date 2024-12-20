import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findById(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) : Promise<Task> {
    if (!data.id) {
      // @done IMPLEMENT HERE USING PRISMA API
      return this.prisma.task.create({ data: data as Prisma.TaskCreateInput });
    }

    // @done IMPLEMENT HERE USING PRISMA API
    const { id, ...updateData } = data as Prisma.TaskUpdateInput & { id: number };
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }
}
