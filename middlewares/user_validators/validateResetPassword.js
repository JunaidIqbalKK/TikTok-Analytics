import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: JoiPasswordComplexity().required(),
});

export function validateResetPassword(req, res, next) {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
