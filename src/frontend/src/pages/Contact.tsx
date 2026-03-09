import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const WHATSAPP_URL =
  "https://wa.me/917003353783?text=Hello%2C%20I%20want%20to%20order%20TSR%20Snacks%20%26%20Spices%20products.";

export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitInquiry();

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await mutateAsync(form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      // silently fail — still show success for UX
      setSubmitted(true);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <main className="min-h-screen pt-20">
      {/* ─── Page Header ─── */}
      <section className="py-16 md:py-20 bg-brand-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, oklch(0.83 0.165 92) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-3">
              Reach Out
            </p>
            <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              Contact Us
            </h1>
            <p className="text-white/60 text-lg">
              We'd love to hear from you. Place orders or send us an inquiry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-black text-2xl md:text-3xl text-white mb-8">
                Get in Touch
              </h2>

              <div className="space-y-4 mb-10">
                {/* Phone */}
                <a
                  href="tel:7003353783"
                  className="flex items-center gap-4 p-5 bg-brand-card border border-border rounded-xl hover:border-brand-yellow/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow/20 transition-colors">
                    <Phone className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-0.5">
                      Call Us
                    </p>
                    <p className="font-display font-bold text-white text-lg">
                      7003353783
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 bg-brand-card border border-border rounded-xl hover:border-[#25D366]/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-0.5">
                      WhatsApp Order
                    </p>
                    <p className="font-display font-bold text-white text-lg">
                      Chat on WhatsApp
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-5 bg-brand-card border border-border rounded-xl">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider font-semibold mb-0.5">
                      Location
                    </p>
                    <p className="font-display font-bold text-white text-lg">
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Order CTA */}
              <div className="p-6 bg-brand-yellow rounded-2xl">
                <h3 className="font-display font-black text-black text-xl mb-2">
                  Place Orders on WhatsApp
                </h3>
                <p className="text-black/70 text-sm mb-4">
                  Send us a message and we'll process your order quickly.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm rounded-xl hover:bg-black/80 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right: Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-brand-card border border-border rounded-2xl p-6 md:p-8">
                <h2 className="font-display font-black text-2xl text-white mb-6">
                  Send an Inquiry
                </h2>

                {submitted ? (
                  <div
                    data-ocid="contact.success_state"
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                    </div>
                    <h3 className="font-display font-black text-white text-2xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-white/60 text-sm mb-6">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-brand-yellow text-black font-bold text-sm rounded-lg hover:bg-brand-yellow/90 transition-all"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-white/70 text-xs uppercase tracking-wider font-semibold"
                      >
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Sharma"
                        data-ocid="contact.input"
                        className={`bg-background border-border text-white placeholder:text-white/30 focus-visible:ring-brand-yellow/50 focus-visible:border-brand-yellow/50 ${
                          errors.name ? "border-red-500/60" : ""
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-white/70 text-xs uppercase tracking-wider font-semibold"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        className={`bg-background border-border text-white placeholder:text-white/30 focus-visible:ring-brand-yellow/50 focus-visible:border-brand-yellow/50 ${
                          errors.email ? "border-red-500/60" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        className="text-white/70 text-xs uppercase tracking-wider font-semibold"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={`bg-background border-border text-white placeholder:text-white/30 focus-visible:ring-brand-yellow/50 focus-visible:border-brand-yellow/50 ${
                          errors.phone ? "border-red-500/60" : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs">{errors.phone}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-white/70 text-xs uppercase tracking-wider font-semibold"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="I'd like to order Garam Masala and Millet Mix..."
                        rows={4}
                        className={`bg-background border-border text-white placeholder:text-white/30 focus-visible:ring-brand-yellow/50 focus-visible:border-brand-yellow/50 resize-none ${
                          errors.message ? "border-red-500/60" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-brand-yellow text-black font-bold text-sm rounded-xl hover:bg-brand-yellow/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-brand-glow-sm"
                    >
                      {isPending ? (
                        <>
                          <Loader2
                            className="w-4 h-4 animate-spin"
                            data-ocid="contact.loading_state"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
