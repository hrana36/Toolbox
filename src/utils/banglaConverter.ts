// Unicode <-> Bijoy Bangla conversion mapping and utility functions

// Simplified mapping for standard letters and modifiers
const unicodeToBijoyMap: { [key: string]: string } = {
  "অ": "a", "আ": "Av", "ই": "B", "ঈ": "C", "উ": "D", "ঊ": "E", "ঋ": "F", "এ": "G", "ঐ": "H", "ও": "I", "ঔ": "J",
  "ক": "K", "খ": "L", "গ": "M", "ঘ": "N", "ঙ": "O",
  "চ": "P", "ছ": "Q", "জ": "R", "ঝ": "S", "ঞ": "T",
  "ট": "U", "ঠ": "V", "ড": "W", "ঢ": "X", "ণ": "Y",
  "ত": "Z", "থ": "_", "দ": "d", "ধ": "e", "ন": "b",
  "প": "c", "ফ": "f", "ব": "e", "ভ": "f", "ম": "g",
  "য": "h", "র": "i", "ল": "j", "শ": "k", "ষ": "l", "স": "m", "হ": "n",
  "ড়": "o", "ঢ়": "p", "য়": "q", "ৎ": "r", "ং": "s", "ঃ": "t", "ঁ": "u",
  "া": "v", "ি": "d", "ী": "e", "ু": "f", "ূ": "g", "ৃ": "h", "ে": "i", "ৈ": "j", "ো": "k", "ৌ": "l"
};

const bijoyToUnicodeMap: { [key: string]: string } = {};
for (const key in unicodeToBijoyMap) {
  bijoyToUnicodeMap[unicodeToBijoyMap[key]] = key;
}

export function unicodeToBijoy(text: string): string {
  if (!text) return "";
  let result = "";
  
  // Basic character-by-character replacement with modifier placement adjustment
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    // Check if next character is a modifier that should be placed BEFORE the consonant in Bijoy (e.g. e-kar, i-kar)
    if (nextChar && (nextChar === "ে" || nextChar === "ি" || nextChar === "ৈ")) {
      const modifierBijoy = unicodeToBijoyMap[nextChar] || "";
      const consonantBijoy = unicodeToBijoyMap[char] || char;
      result += modifierBijoy + consonantBijoy;
      i++; // skip next char
    } else {
      result += unicodeToBijoyMap[char] || char;
    }
  }
  return result;
}

export function bijoyToUnicode(text: string): string {
  if (!text) return "";
  let result = "";
  
  // Basic character-by-character replacement with pre-modifier re-ordering
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];
    
    // If current character is a pre-modifier in Bijoy (like 'i' for e-kar, 'd' for i-kar), swap it
    if (nextChar && (char === "i" || char === "d" || char === "j")) {
      const modifierUnicode = bijoyToUnicodeMap[char] || "";
      const consonantUnicode = bijoyToUnicodeMap[nextChar] || nextChar;
      result += consonantUnicode + modifierUnicode;
      i++; // skip next char
    } else {
      result += bijoyToUnicodeMap[char] || char;
    }
  }
  return result;
}
