import UserSchema from "@/validations/user";

export const RegisterSchema = UserSchema.omit({
  new_email: true,
  new_password: true,
  old_password: true,
});

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});
