import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Department } from '../entities/department.entity';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => [CreateDepartmentInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentInput)
  subDepartments?: CreateDepartmentInput[];

  @IsString()
  @IsOptional()
  parent?: Department;
}
