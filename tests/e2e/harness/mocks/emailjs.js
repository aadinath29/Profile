/**
 * Mock EmailJS Browser Client
 * Profile / Aadinath Magar Portfolio E2E Test Suite
 */

export function createEmailJSMock() {
  const sentMessages = [];
  let shouldFail = false;

  return {
    send: async (serviceId, templateId, templateParams, publicKey) => {
      if (shouldFail) {
        throw new Error('EmailJS mock network error: 500 Internal Server Error');
      }
      const record = {
        serviceId,
        templateId,
        templateParams,
        publicKey,
        timestamp: Date.now()
      };
      sentMessages.push(record);
      return { status: 200, text: 'OK' };
    },

    sendForm: async (serviceId, templateId, formElement, publicKey) => {
      if (shouldFail) {
        throw new Error('EmailJS mock form submission failed');
      }
      const formData = {};
      if (formElement && formElement.elements) {
        for (const el of formElement.elements) {
          if (el.name) formData[el.name] = el.value;
        }
      }
      const record = {
        serviceId,
        templateId,
        formData,
        publicKey,
        timestamp: Date.now()
      };
      sentMessages.push(record);
      return { status: 200, text: 'OK' };
    },

    setShouldFail: (fail) => {
      shouldFail = Boolean(fail);
    },

    getSentMessages: () => [...sentMessages],

    reset: () => {
      sentMessages.length = 0;
      shouldFail = false;
    }
  };
}
