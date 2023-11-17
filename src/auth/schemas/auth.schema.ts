import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Auth {

    @Prop({ required: true, match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/})
    email: string;

    @Prop({ required: true, minlength: 6, maxlength: 30 })
    password: string;

    @Prop({ required: true})
    rememberMe: boolean;                                                                                                          
}

export const AuthSchema = SchemaFactory.createForClass(Auth);