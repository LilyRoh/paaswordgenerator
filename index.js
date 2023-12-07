const passwordLengthInput = document.getElementById('length');
const includeSymbols = document.getElementById('symbols');
const includeNumbers = document.getElementById('numbers');

document.addEventListener('DOMContentLoaded', function () {
  const clipboardDisplay = document.getElementById('clipboard');
  const generateBtn = document.getElementById('generate');
  const copyBtn = document.getElementById('copy');

  function newPassword() {
    console.log('Button clicked!');
  }
  function copyToClipboard() {
    console.log('Button clicked!');
  }
});

// letter generator
function getRandomLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// number generator
function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// symbol generator
function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateRandomPassword(length) {
  let password = '';
  const minLength = 4;
  const maxLength = 20;

  length = Math.min(Math.max(length, minLength), maxLength);

  for (let i = 0; i < length; i++) {
    let randomType;

    if (includeSymbols.checked && includeNumbers.checked) {
      randomType = Math.floor(Math.random() * 3);
    } else if (includeSymbols.checked) {
      randomType = Math.random() < 0.5 ? 0 : 2;
    } else if (includeNumbers.checked) {
      randomType = Math.random() < 0.5 ? 0 : 1;
    } else {
      randomType = 0; // Only letters
    }

    switch (randomType) {
      case 0:
        password += getRandomLetter();
        break;
      case 1:
        password += getRandomNumber();
        break;
      case 2:
        password += getRandomSymbol();
        break;
    }
  }

  return password;
}

// new password button
function newPassword() {
  const length = parseInt(passwordLengthInput.value, 10);
  const generatedPassword1 = generateRandomPassword(length);
  const generatedPassword2 = generateRandomPassword(length);

  if (clipboardDisplay && clipboardDisplay.tagName === 'DIV') {
    clipboardDisplay.innerHTML = `
            <div>
                <button onclick="copyToClipboard(0)">${generatedPassword1}</button>
            </div>
            <div>
                <button onclick="copyToClipboard(1)">${generatedPassword2}</button>
            </div>
        `;
    console.log('Password displayed on the clipboard-1:', generatedPassword1);
    console.log('Password displayed on the clipboard-2:', generatedPassword2);
  } else {
    console.error('Error: clipboardDisplay is not a valid element.');
  }

  return [generatedPassword1, generatedPassword2];
}

// copy to clipboard button
function copyToClipboard(index) {
  const passwordField = clipboardDisplay.children[index];
  if (!passwordField) {
    console.error('No password field found.');
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(passwordField.textContent)
      .then(() => {
        console.log('Password copied to clipboard:', passwordField.textContent);
      })
      .catch((error) => {
        console.error('Unable to copy to clipboard using Clipboard API', error);
      });
  } else {
    // Fallback for browsers that do not support the Clipboard API
    const textarea = document.createElement('textarea');
    textarea.value = passwordField.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    console.log(
      'Password copied to clipboard (fallback):',
      passwordField.textContent
    );
  }
}
