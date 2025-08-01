import { FileJson, Code, Cloud, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "JSON Editing",
      description: "Edit and visualize JSON files with our intuitive interface."
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Storage",
      description: "Save your JSON files securely in the cloud and access anywhere."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Secure",
      description: "Enterprise-grade security to protect your data."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <FileJson className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Work with JSON <span className="text-indigo-600">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            The ultimate tool for developers to create, edit, validate, and store JSON files with ease.
          </p>
          <div className="flex gap-4 justify-center">
              <SignInButton>
                <Button variant="default" size="lg" className="border">
                  Get Started
                </Button>
              </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-400">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your JSON Workflow?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who trust our platform for their JSON needs.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} JSON Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
}