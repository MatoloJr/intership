import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { title: "Acceptance of Terms", content: "By accessing or using the KRCS Internship Portal, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform." },
  { title: "Eligibility", content: "The platform is available to students currently enrolled in accredited universities and colleges in Kenya, or recent graduates (within 2 years of graduation). You must be at least 18 years old to create an account." },
  { title: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration. KRCS reserves the right to suspend or terminate accounts that violate these terms or contain false information." },
  { title: "Application Process", content: "Submitting an application does not guarantee placement. KRCS reserves the right to accept or reject applications at its sole discretion. All application materials become the property of KRCS and may be retained for future consideration." },
  { title: "Intellectual Property", content: "All content on the platform, including logos, text, graphics and software, is the property of KRCS or its licensors. You may not reproduce, distribute, or create derivative works without prior written consent." },
  { title: "User Conduct", content: "You agree not to: submit fraudulent or misleading information, attempt to access other users' accounts, use the platform for any illegal purpose, upload malicious files or code, harass or discriminate against other users." },
  { title: "Privacy", content: "Your use of the platform is also governed by our Privacy Policy. By using the platform, you consent to the collection and use of your information as described in the Privacy Policy." },
  { title: "Limitation of Liability", content: "KRCS shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. The platform is provided 'as is' without warranties of any kind." },
  { title: "Modifications", content: "KRCS reserves the right to modify these terms at any time. Changes will be effective upon posting. Your continued use of the platform constitutes acceptance of modified terms." },
  { title: "Governing Law", content: "These terms shall be governed by the laws of the Republic of Kenya. Any disputes shall be resolved through arbitration in Nairobi, Kenya." },
];

const TermsOfService = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-1">
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Terms of Service</h1>
          <p className="text-primary-foreground/80 mt-3">Last updated: March 1, 2026</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Welcome to the KRCS Internship Portal. These Terms of Service govern your use of the platform operated by the Kenya Red Cross Society.
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
          <p className="text-sm text-muted-foreground">For questions about these Terms, contact <a href="mailto:legal@redcross.or.ke" className="text-primary font-medium hover:underline">legal@redcross.or.ke</a></p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default TermsOfService;
