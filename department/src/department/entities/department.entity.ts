import { ObjectType, Field } from '@nestjs/graphql';
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
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
