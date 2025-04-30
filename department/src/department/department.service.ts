// department.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.dto';
import { SubDepartment } from './entities/sub-department.entity';

import { UpdateDepartmentInput } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    @InjectRepository(SubDepartment)
    private readonly subDepartmentRepo: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    try {
      const existingDepartment = await this.departmentRepo.findOne({
        where: { name: input.name },
      });
      if (existingDepartment) {
        throw new BadRequestException(
          'Department with this name already exists',
        );
      }
      const department = await this.departmentRepo.save({
        name: input.name,
      });

      if (input.subDepartments?.length) {
        department.subDepartments = await Promise.all(
          input.subDepartments.map((sub) =>
            this.departmentRepo.save({ name: sub.name, parent: department }),
          ),
        );
      } else {
        department.subDepartments = [];
      }
      console.log('Creating department:', department);
      console.log('Parent:', parent);

      return this.departmentRepo.save(department);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      throw new InternalServerErrorException('Error creating Department');
    }
  }

  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<Department[]> {
    return this.departmentRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['subDepartments', 'parent'],
    });
  }

  async update(id: number, input: UpdateDepartmentInput): Promise<Department> {
    const department = await this.departmentRepo.findOne({
      where: { id },
      relations: ['subDepartments'],
    });
    if (!department) throw new Error('Department not found');

    department.name = input.name ?? department.name;

    if (input.subDepartments?.length) {
      for (const sub of input.subDepartments) {
        const existingSubDepartment = department.subDepartments.find(
          (subDep) => subDep.name === sub.name,
        );
        if (!existingSubDepartment) {
          const newSubDepartment = await this.departmentRepo.save({
            name: sub.name,
            parent: department,
          });
          department.subDepartments.push(newSubDepartment);
        }
      }
    }

    return this.departmentRepo.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.departmentRepo.delete(id);
    return result.affected > 0;
  }
}
