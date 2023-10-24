import Joi from "joi";

const updateUserSchema = Joi.object({
  username: Joi.string().optional().min(4).label("User Name"),
  email: Joi.string().email().optional().label("Email"),
  CNIC: Joi.string()
    .optional()
    .regex(/^\d{13}$/)
    .message("CNIC value must be 13 digits // Example: 1234512345671")
    .label("CNIC"),
  phoneNo1: Joi.string()
    .optional()
    .regex(/^\d{11}$/)
    .message("Phone Number must be 11 digits // Example: 03001234567")
    .label("Phone No 1"),
  phoneNo2: Joi.string()
    .optional()
    .regex(/^\d{11}$/)
    .message("Phone Number must be 11 digits // Example: 03001234567")
    .label("Phone No 2"),
  addressLine1: Joi.string()
    .optional()
    .regex(/^[A-Za-z0-9\s\-.,#]+$/)
    .label("Address Line 1"),
  addressLine2: Joi.string()
    .optional()
    .regex(/^[A-Za-z0-9\s\-.,#]+$/)
    .label("Address Line 2"),
  city: Joi.string()
    .optional()
    .regex(/^[A-Za-z\s]+$/)
    .label("City"),
});

export function validateUpdateUser(req, res, next) {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
