import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Department } from './entities/department.entity';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.dto';
import { UpdateDepartmentInput } from './dto/update-department.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-guard';

@Resolver(() => Department)
@UseGuards(GqlAuthGuard)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(
    @Args('input') input: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.create(input);
  }

  @Query(() => [Department])
  getDepartments(): Promise<Department[]> {
    console.log('Fetching all departments');
    return this.departmentService.findAll();
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.departmentService.remove(id);
  }
}
