// Edit your clinic details here — everything on the site reads from this file.
export const clinic = {
  name: "Smile Studio",
  tagline: "Dental Care",
  city: "Your City",
  phone: "+91 90000 00000",
  phoneRaw: "919000000000",
  whatsapp: "919000000000",
  email: "hello@smilestudio.example",
  address: "Clinic Address, Sector 00, Your City, State 000000",
  hours: "Mon – Sat: 10 AM – 3 PM, 5:30 – 8 PM · Sun by appointment",
  dentist: "Dr. [Dentist Name]",
  qualifications: "[Verified Qualifications]",
};

export function whatsappLink(text: string) {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
}
