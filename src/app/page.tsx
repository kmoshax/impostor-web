"use client";

import { ServerForm } from "@/components/forms/server-form";
import { Instructions } from "@/components/layout/instructions";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="container mx-auto py-4 space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-[1024px] md:px-6 mx-auto"
      >
        <ServerForm />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-[1024px] md:px-6 mx-auto"
      >
        <Instructions />
      </motion.section>
    </div>
  );
}
