import CompanyInfo from "./company";
import QuickLinks from "./QuickLinks";
import ContactUs from "./ContactUs";
import ExtraLinks from "./ExtraLinks";
import BottomBar from "./BottomBar";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">

      <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
    
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <CompanyInfo />
        <QuickLinks />
        <ContactUs />
        <ExtraLinks />
      </div>

      <BottomBar />
    </footer>
  );
}
