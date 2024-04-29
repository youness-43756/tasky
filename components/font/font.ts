import { Roboto, Sansita } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const sansita = Sansita({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});
