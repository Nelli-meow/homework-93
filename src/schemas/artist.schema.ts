import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ default: null, type: String })
  image: string;

  @Prop({ required: true, type: String })
  description: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
