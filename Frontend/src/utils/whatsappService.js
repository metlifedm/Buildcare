// src/utils/whatsappService.js
import { COMPANY } from './constants';

/**
 * Construct and open WhatsApp with form data
 */
export function sendToWhatsApp(formData) {
  const message = constructWhatsAppMessage(formData);
  const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Construct WhatsApp message from form data
 */
function constructWhatsAppMessage(formData) {
  const lines = [
    `🏠 *New Inquiry - Buildcare*`,
    ``,
    `👤 *Name:* ${formData.name}`,
    `📞 *Phone:* ${formData.phone}`,
    `📧 *Email:* ${formData.email}`,
  ];

  if (formData.service) {
    lines.push(`🔧 *Service:* ${formData.service}`);
  }

  if (formData.budget) {
    lines.push(`💰 *Budget:* ${formData.budget}`);
  }

  if (formData.message) {
    lines.push(``, `💬 *Message:*`, formData.message);
  }

  lines.push(``, `---`, `Sent from Buildcare Website`);

  return lines.join('\n');
}

/**
 * Open WhatsApp with a general message
 */
export function openWhatsApp(customMessage = '') {
  const message = customMessage || `Hi Buildcare! I'm interested in your interior design services. Please share more details.`;
  const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Open WhatsApp for specific service
 */
export function openWhatsAppForService(serviceName) {
  const message = `Hi Buildcare! I'm interested in your *${serviceName}* service. Could you please share more details and pricing?`;
  const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}