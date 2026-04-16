// Number to Words Converter — Indian & International Systems

const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];

const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty",
  "Sixty", "Seventy", "Eighty", "Ninety",
];

function belowThousand(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100) {
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  }
  return (
    ones[Math.floor(n / 100)] +
    " Hundred" +
    (n % 100 ? " " + belowThousand(n % 100) : "")
  );
}

export function toIndianWords(num: number, includeRupees = false): string {
  if (num === 0) return "Zero" + (includeRupees ? " Rupees Only" : "");
  if (num < 0) return "Minus " + toIndianWords(-num, includeRupees);

  // Handle decimals (paise)
  const intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);

  let result = "";
  let n = intPart;

  // Indian system: ones, thousands, lakhs, crores, ...
  if (n >= 10_00_00_00_000) {
    // 1000 crore+
    const arabs = Math.floor(n / 10_00_00_00_000);
    result += belowThousand(arabs) + " Arab ";
    n %= 10_00_00_00_000;
  }
  if (n >= 1_00_00_000) {
    const crores = Math.floor(n / 1_00_00_000);
    result += belowThousand(crores) + " Crore ";
    n %= 1_00_00_000;
  }
  if (n >= 1_00_000) {
    const lakhs = Math.floor(n / 1_00_000);
    result += belowThousand(lakhs) + " Lakh ";
    n %= 1_00_000;
  }
  if (n >= 1_000) {
    const thousands = Math.floor(n / 1_000);
    result += belowThousand(thousands) + " Thousand ";
    n %= 1_000;
  }
  if (n > 0) {
    result += belowThousand(n);
  }

  result = result.trim();

  if (includeRupees) {
    result = "Rupees " + result;
    if (decPart > 0) {
      result += " and " + belowThousand(decPart) + " Paise";
    }
    result += " Only";
  } else if (decPart > 0) {
    result += " Point " + ones[Math.floor(decPart / 10)] + (decPart % 10 ? " " + ones[decPart % 10] : "");
  }

  return result;
}

export function toInternationalWords(num: number): string {
  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + toInternationalWords(-num);

  const intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);

  let result = "";
  let n = intPart;

  const scale = [
    { value: 1_000_000_000_000, name: "Trillion" },
    { value: 1_000_000_000, name: "Billion" },
    { value: 1_000_000, name: "Million" },
    { value: 1_000, name: "Thousand" },
  ];

  for (const { value, name } of scale) {
    if (n >= value) {
      result += belowThousand(Math.floor(n / value)) + " " + name + " ";
      n %= value;
    }
  }

  if (n > 0) result += belowThousand(n);
  result = result.trim();

  if (decPart > 0) {
    result += " Point " + ones[Math.floor(decPart / 10)] + (decPart % 10 ? " " + ones[decPart % 10] : "");
  }

  return result;
}

export function formatIndian(num: number): string {
  const str = Math.floor(num).toString();
  if (str.length <= 3) return str;
  const last3 = str.slice(-3);
  const rest = str.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
}

export function formatInternational(num: number): string {
  return Math.floor(num).toLocaleString("en-US");
}

// Specific number pages for SEO
export const popularNumbers = [
  1000, 5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000,
  75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000,
  400000, 500000, 600000, 700000, 750000, 800000, 900000, 1000000,
  1100000, 1200000, 1500000, 2000000, 2500000, 5000000, 10000000,
  20000000, 25000000, 50000000, 100000000, 200000000, 500000000,
  1000000000, 10000000000,
];
