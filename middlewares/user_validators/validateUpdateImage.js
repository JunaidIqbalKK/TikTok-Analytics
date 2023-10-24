import Joi from "joi";

const updateImageSchema = Joi.object({
  picture: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!isBase64Image(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Base64 Validation"),
});

function isBase64Image(value) {
  if (typeof value !== "string") {
    return false;
  }
  const base64String = value.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  try {
    const buffer = Buffer.from(base64String, "base64");
    if (buffer.length < 4) {
      return false;
    }

    const magicNumber = buffer.readUInt32BE(0);
    return (
      magicNumber === 0x89504e47 || // PNG
      magicNumber === 0xffd8ffe0 || // JPEG
      magicNumber === 0xffd8ffe1 // JPEG
    );
  } catch (error) {
    return false;
  }
}

export function validateUpdateImage(req, res, next) {
  const { error } = updateImageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
