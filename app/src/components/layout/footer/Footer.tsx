/* eslint-disable @next/next/no-img-element */
"use client";
import { FooterLinks } from "./FooterLinks";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer
      className={`sm:[grid-area-footer] flex items-center sm:items-start gap-[1rem] sm:justify-between w-full py-5 sm:px-60 bg-secundario text-primario`}
    >
      <Link href="/">
        <img
          src="/assets/imgs/imgbeathub1b2.png"
          alt="BeatHub-logo"
          width={150}
          height={150}
          className="hidden sm:block"
        />
      </Link>
      <FooterLinks
        title="BeatHub"
        links={[
          { href: "#", title: "Sobre Nosotros" },
          { href: "#", title: "Artistas" },
        ]}
      />
      <FooterLinks
        title="Soporte"
        links={[
          { href: "#", title: "Precios" },
          { href: "#", title: "Ventas" },
          { href: "#", title: "Métodos de pago" },
          { href: "#", title: "Registro" },
          { href: "#", title: "Contacto" },
          { href: "#", title: "Preferencias de Cookies" },
        ]}
      />
      <FooterLinks
        title="Redes Sociales"
        links={[
          { href: "#", title: "Instagram" },
          { href: "#", title: "Youtube" },
          { href: "#", title: "Spotify" },
          { href: "#", title: "SoundCloud" },
          { href: "#", title: "Facebook" },
          { href: "#", title: "Twitter" },
        ]}
      />
    </footer>
  );
};
