/**
 * Frontend form validation utilities.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  // Accepts standard 10-digit Indian numbers with optional +91 or leading 0
  const clean = phone.replace(/[\s\-()]/g, "");
  const re = /^(\+91|91|0)?[6-9]\d{9}$/;
  return re.test(clean);
}

export function validatePassword(password: string): {
  isValid: boolean;
  hasLength: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
} {
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: hasLength && hasNumber && hasSpecial,
    hasLength,
    hasNumber,
    hasSpecial,
  };
}

export function validateBookingForm(data: {
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  guestsCount: number;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }

  if (!data.email.trim() || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim() || !validatePhone(data.phone)) {
    errors.phone = "Please enter a valid 10-digit Indian phone number.";
  }

  if (!data.startDate) {
    errors.startDate = "Please select a preferred start date.";
  }

  if (!data.guestsCount || data.guestsCount < 1) {
    errors.guestsCount = "Please select at least 1 guest.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePartnerForm(data: {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  district: string;
  description: string;
  agreedToTerms: boolean;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }
  if (!data.businessName.trim()) {
    errors.businessName = "Please enter your business or property name.";
  }
  if (!data.email.trim() || !validateEmail(data.email)) {
    errors.email = "Please provide a valid email address.";
  }
  if (!data.phone.trim() || !validatePhone(data.phone)) {
    errors.phone = "Please provide a valid contact number.";
  }
  if (!data.district.trim()) {
    errors.district = "Please select your Karnataka district.";
  }
  if (!data.description.trim() || data.description.trim().length < 20) {
    errors.description = "Please describe your offering (at least 20 characters).";
  }
  if (!data.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the partner listing guidelines.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(data: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your name.";
  }
  if (!data.email.trim() || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject.trim()) {
    errors.subject = "Please enter a subject.";
  }
  if (!data.message.trim() || data.message.trim().length < 15) {
    errors.message = "Please write a message with at least 15 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
