import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
class SubDepartmentUpdateInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => [SubDepartmentUpdateInput], { nullable: true })
  @IsOptional()
  @IsArray()
  subDepartments?: SubDepartmentUpdateInput[];
}
