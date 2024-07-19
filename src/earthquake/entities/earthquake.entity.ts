import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from 'type-graphql';
import { EarthquakeMagType } from '../enums/earthquake-mag.enum';
import { EarthquakeSource } from '../enums/earthquake-source.enum';

@ObjectType()
@Entity()
export class Earthquake extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('timestamp')
  dateTime: Date;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  depth: number;

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 2 })
  magnitude: number;

  @Field(() => EarthquakeMagType)
  @Column({
    type: 'enum',
    enum: EarthquakeMagType,
  })
  magType: EarthquakeMagType;

  @Field(() => Int)
  @Column('int')
  nbStations: number;

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  gap: Maybe<number>;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  distance: Maybe<number>;

  @Field(() => Float, { nullable: true })
  @Column('decimal', { precision: 10, scale: 9 })
  rms: Maybe<number>;

  @Field(() => EarthquakeSource)
  @Column({
    type: 'enum',
    enum: EarthquakeSource,
  })
  source: EarthquakeSource;

  @Field(() => String, { nullable: true })
  @Column('varchar', { nullable: true })
  eventId: Maybe<string>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
