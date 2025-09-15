import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function CompanyInfo() {
  return (
    <div className="lg:col-span-1">
      <div className="flex items-center mb-4">
        <span className="text-xl font-bold">xxxx</span>
        <span className="text-orange-500 text-xl font-bold ml-1">xxxxx</span>
        <div className="w-3 h-3 bg-orange-500 rounded-full ml-1 mt-1"></div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis neque esse repudiandae magni accusamus quisquam consequuntur nulla adipisci? Praesentium esse voluptatem aperiam laudantium ipsa id voluptate quod optio consequuntur qui.
      </p>

      <div className="flex space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition">
          <Facebook className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 cursor-pointer transition">
          <Twitter className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 cursor-pointer transition">
          <Youtube className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition">
          <Instagram className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
