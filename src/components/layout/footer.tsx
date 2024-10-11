"use client";
import { motion } from "framer-motion";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Discord", href: "https://discord.gg/Mk3w6Tb" },
  { name: "Github", href: "https://github.com/Impostor/Impostor" },
  {
    name: "Server Installation",
    href: "https://github.com/Impostor/Impostor/blob/master/docs/Running-the-server.md",
  },
  {
    name: "Proxy Setup",
    href: "https://github.com/Impostor/Impostor/blob/master/docs/Http-server.md",
  },
];

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          {navigation.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                target="_blank"
                className="text-sm text-gray-600 hover:text-muted-foreground transition-colors dark:text-gray-100"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-100">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="http://kmosha.vercel.app"
            target="_blank"
            className="hover:text-muted-foreground transition-colors"
          >
            kmΟShα
          </a>
          . All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
