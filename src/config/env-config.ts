import Joi from 'joi';
import process from 'process';

export interface EnvConfig {
  databaseUrl: string;
  isGqlDebugEnabled: boolean;
}

export const envConfig = (): EnvConfig => {
  const values = {
    databaseUrl: process.env.DB_URL,
    isGqlDebugEnabled: process.env.GQL_DEBUG,
  };

  const schema = Joi.object<EnvConfig>({
    databaseUrl: Joi.string().required(),
    isGqlDebugEnabled: Joi.boolean().default(false),
  });

  // Validates our values using the schema.
  // Passing a flag to tell Joi to not stop validation on the
  // first error, we want all the errors found.
  const { error, value: validated } = schema.validate(values, {
    abortEarly: false,
    convert: true,
  });

  // If the validation is invalid, "error" is assigned a
  // ValidationError object providing more information.
  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  // If the validation is valid, then the "error" will be
  // undefined and this will return successfully.
  return validated;
};
