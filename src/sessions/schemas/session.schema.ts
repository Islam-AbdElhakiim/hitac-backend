import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema()
export class Session {

  @Prop({required: true})
  expiry: Date;

  @Prop({required: true})
  userId: mongoose.Types.ObjectId

}

export const SessionSchema = SchemaFactory.createForClass(Session);