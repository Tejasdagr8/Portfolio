import { motion } from "framer-motion";
import { capabilities } from "../data/capabilities";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function CapabilityMap() {
  return (
    <motion.div
      className="grid sm:grid-cols-2 gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
    >
      {capabilities.map((layer) => (
        <motion.div
          key={layer.id}
          variants={fadeUp}
          className="card-glass card-glass-hover p-6 sm:p-7 flex flex-col h-full"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mint mb-2">{layer.title}</p>
          <h3 className="font-display font-bold text-lg text-paper leading-snug mb-4">{layer.headline}</h3>
          <ul className="space-y-2 flex-1 mb-5">
            {layer.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-fog leading-relaxed">
                <span className="text-mint shrink-0 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
            {layer.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/[0.13] text-fog"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
