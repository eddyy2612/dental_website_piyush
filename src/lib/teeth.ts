export type ToothType = "incisors" | "canines" | "premolars" | "molars" | "wisdom";
export const toothInfo: Record<ToothType, { name: string; count: string; text: string }> = {
  incisors: { name: "Incisors", count: "8 teeth", text: "Thin, sharp front teeth that bite and cut food. They shape your smile and help with clear speech." },
  canines: { name: "Canines", count: "4 teeth", text: "The pointed 'eye teeth' that grip and tear food, and guide your bite as the jaw moves." },
  premolars: { name: "Premolars", count: "8 teeth", text: "Two-cusped teeth between canines and molars that crush and tear food before it reaches the molars." },
  molars: { name: "Molars", count: "8 teeth", text: "Broad, strong back teeth with wide chewing surfaces that grind food finely for easy swallowing." },
  wisdom: { name: "Wisdom Teeth", count: "4 teeth", text: "Third molars that usually appear between 17 and 25. They often lack space and may need removal." },
};
