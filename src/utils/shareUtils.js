// Encoding and decoding mixes for sharing
export const encodeMix = (mixData) => {
  try {
    const jsonString = JSON.stringify(mixData);
    return btoa(jsonString);
  } catch (error) {
    console.error('Error encoding mix:', error);
    return null;
  }
};

export const decodeMix = (encodedString) => {
  try {
    const jsonString = atob(encodedString);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding mix:', error);
    return null;
  }
};

export const generateShareUrl = (mixData) => {
  const encoded = encodeMix(mixData);
  if (!encoded) return null;

  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?mix=${encoded}`;
};

export const loadMixFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const mixParam = params.get('mix');

  if (!mixParam) return null;

  return decodeMix(mixParam);
};

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};
