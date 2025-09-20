import React from "react";
import Button from "../button/button";

export default function NewsletterComponent() {
  return (
    <div className="w-full bg-white rounded-none shadow-lg overflow-hidden relative border-t border-b">
      <div className="px-6 py-12 md:px-16 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="text-gray-800">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-[#FFC000] to-[#FF8A00] bg-clip-text text-transparent">
              Subscribe to <br /> Our Newsletter
            </h2>
            <p className="text-gray-600 text-lg mb-6 md:mb-0">
              Get exclusive discounts and latest news delivered
              to your inbox for free!
            </p>
          </div>

          {/* Right side - Form */}
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 border border-gray-300 outline-none focus:ring-4 focus:ring-orange-200 transition-all duration-200"
                />
              </div>

              {/* Gradient Button */}
              <Button
                text="Submit"
                variant="primary"
                shape="pill"
                size="md"
                className="bg-gradient-to-r from-[#FFC000] to-[#FF8A00] text-white font-semibold hover:opacity-90 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
