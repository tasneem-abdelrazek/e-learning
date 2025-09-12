export default function Links() {
  return (
    <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
      <li className="hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 pb-1 cursor-pointer">
        Home
      </li>
      <li className="hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 pb-1 cursor-pointer">
        Courses
      </li>
      <li className="hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 pb-1 cursor-pointer">
        Blog
      </li>
      <li className="hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 pb-1 cursor-pointer">
        About Us
      </li>
      <li className="hover:text-orange-500 border-b-2 border-transparent hover:border-orange-500 pb-1 cursor-pointer">
        Contact Us
      </li>
    </ul>
  );
}
