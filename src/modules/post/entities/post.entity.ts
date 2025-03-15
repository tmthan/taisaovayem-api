import { BaseEntity } from 'src/database/entities';
import { User } from 'src/modules/auth/entities';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { PostStatus } from '../types';
import { Tag } from './tag.entity';

@Entity('post')
export class Post extends BaseEntity {
  @Column()
  @Index()
  name!: string;

  @Column()
  @Index()
  slug!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  author!: User;

  @Column()
  content!: string;

  @Column()
  status: PostStatus;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  approvedBy!: User;

  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinColumn()
  tags?: Tag[];
}
