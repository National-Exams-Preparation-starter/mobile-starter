interface ValidationSchema {
  type: "string" | "email" | "number" | "date";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationSchema;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useValidate = () => {
  const validateField = (value: string, rules: ValidationSchema): string => {
    if (rules.required && !value) {
      return rules.message || `This field is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return rules.message || `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.message || `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.type === "email" && !EMAIL_REGEX.test(value)) {
      return "Invalid email address";
    }

    // Number validation
    if (rules.type === "number") {
      if (isNaN(Number(value))) {
        return rules.message || "Only numeric values are allowed";
      }
    }

    // Date validation (only allow today or past dates)
    if (rules.type === "date") {
      const inputDate = new Date(value);
      const now = new Date();

      // Strip time from both to compare date-only
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const selected = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate()
      );

      if (selected > today) {
        return rules.message || "Future dates are not allowed";
      }

      if (isNaN(inputDate.getTime())) {
        return rules.message || "Invalid date format";
      }
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Invalid format";
    }
    return "";
  };

  const validate = (formData: any, schema: ValidationRules) => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    Object.keys(schema).forEach((field) => {
      const value = formData[field] || "";
      const error = validateField(value, schema[field]);

      if (error) {
        errors[field] = error;
        isValid = false;
      } else {
        errors[field] = "";
      }
    });

    return { isValid, errors };
  };

  return { validate };
};

export default useValidate;
