// department.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Department {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Department], { nullable: true })
  @OneToMany(() => Department, (dept) => dept.parent, { cascade: true })
  subDepartments?: Department[];

  @ManyToOne(() => Department, (dept) => dept.subDepartments, {
    nullable: true,
  })
  parent?: Department;
}
