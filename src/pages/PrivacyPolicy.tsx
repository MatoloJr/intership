import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { title: "Information We Collect", content: "We collect personal information that you provide when registering on our platform, including your full name, email address, phone number, university/college details, course of study and uploaded documents such as CVs and cover letters. We also collect usage data such as IP addresses, browser type and pages visited." },
  { title: "How We Use Your Information", content: "Your information is used to: process internship applications, match you with suitable opportunities, communicate application status updates, improve our platform and services and comply with legal obligations. We do not sell or share your personal data with third parties for marketing purposes." },
  { title: "Data Security", content: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers and access controls. However, no method of electronic transmission is 100% secure and we cannot guarantee absolute security." },
  { title: "Data Retention", content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, typically for the duration of the internship cycle plus one year. You may request deletion of your account and associated data at any time." },
  { title: "Your Rights", content: "You have the right to: access your personal data, correct inaccurate information, request deletion of your data, object to processing of your data and receive a copy of your data in a portable format. To exercise these rights, contact us at privacy@redcross.or.ke." },
  { title: "Cookies", content: "Our platform uses cookies to enhance your experience, analyze site traffic and personalize content. You can control cookie preferences through your browser settings. Essential cookies required for platform functionality cannot be disabled." },
  { title: "Third-Party Services", content: "We may use third-party services for analytics, email delivery and document storage. These services have their own privacy policies and we ensure they comply with applicable data protection regulations." },
  { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. We will notify you of any significant changes via email or a prominent notice on our platform. Continued use of the platform after changes constitutes acceptance of the updated policy." },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Privacy Policy</h1>
          <p className="text-primary-foreground/80 mt-3">Last updated: March 1, 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Kenya Red Cross Society ("KRCS", "we", "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use and safeguard data through the KRCS Internship Portal.
        </p>
        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-bold text-foreground mb-3">{i + 1}. {s.title}</h2>
              <div className="w-8 h-0.5 bg-primary mb-3" />
              <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 bg-muted rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground">For questions about this Privacy Policy, contact us at <a href="mailto:privacy@redcross.or.ke" className="text-primary font-medium hover:underline">privacy@redcross.or.ke</a></p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy;
