export function extractPerson(description) {
  if (!description) return null;

  const text = description.toUpperCase().trim();

  // Ignore non-person transactions
  const ignore = [
    "ATM",
    "SALARY",
    "INTEREST",
    "CASH",
    "WITHDRAWAL",
    "DEPOSIT",
  ];

  for (const word of ignore) {
    if (text.includes(word)) {
      return null;
    }
  }

  // SBI format:
  // WDL TFR UPI/DR/REFERENCE/PERSON
  if (text.includes("WDL TFR UPI/DR/")) {
    const parts = text.split("/");

    const person = parts[parts.length - 1]?.trim();

    return person || null;
  }

  // Normal UPI format
  const cleaned = text
    .replace("UPI TO", "")
    .replace("UPI", "")
    .replace("NEFT TO", "")
    .replace("NEFT", "")
    .replace("IMPS TO", "")
    .replace("IMPS", "")
    .replace("RTGS TO", "")
    .replace("RTGS", "")
    .trim();

  return cleaned || null;
}