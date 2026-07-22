import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/otaviobonini",
    icon: faGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ot%C3%A1vio-garske-bonini-8436762b4/",
    icon: faLinkedinIn,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/otaviobonini",
    icon: faInstagram,
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-zinc-800">
      <div className="mx-auto  flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 sm:flex-row">
        <span>Otávio Bonini — Todos os direitos reservados</span>

        <div className="flex items-center gap-5">
          <a
            href={`${API_URL}/docs`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            Documentação da API
          </a>

          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="transition-colors hover:text-white"
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
