export default function BottomBar() {
  return (
    <div className="bg-neutral-950"> 
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-300 text-sm">
          All Right Reserved | GOGE AFRICA {new Date().getFullYear()}
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-orange-500 hover:text-orange-400 transition text-sm"
          >
            Site Credit
          </a>
        </div>
      </div>
    </div>
  );
}
