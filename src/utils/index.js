import { Filial, Orders } from "../assets/index";
export const sideBarItems = [
  {
    id: 1,
    icon: Orders,
    title: "Заказы",
    path: "/orders",
  },
  {
    id: 2,
    icon: Filial,
    title: "Филиалы",
    path: "/branches",
  },
];

export function formatPhoneNumber(phoneNumber) {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  const formattedPhoneNumber = `+${numericPhoneNumber.slice(
    0,
    3
  )} (${numericPhoneNumber.slice(3, 5)}) ${numericPhoneNumber.slice(
    5,
    8
  )}-${numericPhoneNumber.slice(8, 10)}-${numericPhoneNumber.slice(10)}`;

  return formattedPhoneNumber;
}

export function formatPhoneNumber2(phoneNumber) {
  if (!phoneNumber || phoneNumber.length == 9 || !phoneNumber.match(/^\d+$/)) {
    return phoneNumber; // Return original number if invalid
  }
  phoneNumber.trim();
  const countryCode = "+998";
  const firstPart = phoneNumber.slice(0, 2);
  const secondPart = phoneNumber.slice(3, 6);
  const thirdPart = phoneNumber.slice(6, 8);
  const fourthPart = phoneNumber.slice(8, 10);

  return `${countryCode} (${firstPart}) ${secondPart}-${thirdPart}-${fourthPart}`;
}

export const f = new Intl.NumberFormat("en-EN").format;
