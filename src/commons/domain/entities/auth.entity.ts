import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 6,
    unique: true,
    nullable: true,
  })
  code: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  activatedAt: string;

  @Column({ type: 'boolean', default: false })
  activated: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAd: Date;
}
