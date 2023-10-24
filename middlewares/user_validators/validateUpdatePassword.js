import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: JoiPasswordComplexity().required(),
});

export function validateUpdatePassword(req, res, next) {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
