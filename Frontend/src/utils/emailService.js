// src/utils/emailService.js
import emailjs from '@emailjs/browser';
import { EMAILJS } from './constants';

/**
 * Initialize EmailJS
 */
export function initEmailJS() {
  if (EMAILJS.publicKey) {
    emailjs.init(EMAILJS.publicKey);
  }
}

/**
 * Send email via EmailJS
 */
export async function sendEmail(formData) {
  try {
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      console.warn('EmailJS configuration missing. Email not sent.');
      // Simulate success for demo
      return { success: true, demo: true };
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      service: formData.service,
      budget: formData.budget || 'Not specified',
      message: formData.message,
      to_name: 'Buildcare Team',
    };

    const response = await emailjs.send(
      EMAILJS.serviceId,
      EMAILJS.templateId,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}