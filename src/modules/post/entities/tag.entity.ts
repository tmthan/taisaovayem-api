import { BaseEntity } from 'src/database/entities';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import slugify from 'slugify';

@Entity('tag')
export class Tag extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  slug!: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }
}
