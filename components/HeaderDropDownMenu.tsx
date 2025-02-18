import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link"; // Import Link for page navigation

// Define types for the menu items
interface DropdownMenuProps {
  menuItems: { text: string; href: string }[]; // Array of objects with text and href
  triggerText: string; // Text for the dropdown trigger (this is used as the title)
  triggerLink: string; // Link for the title (e.g., "/home")
}

const HeaderDropdownMenu = ({
  menuItems,
  triggerText,
  triggerLink,
}: DropdownMenuProps) => {
  return (
    <DropdownMenu>
      {/* Link for the main trigger to navigate to its page */}
      <Link
        href={triggerLink}
        className="bg-gray-600  p-3 rounded flex items-center cursor-pointer"
      >
        {/* Title wrapped directly in Link to navigate when clicked */}
        <span className="text-white">{triggerText}</span>

        {/* Icon inside the DropdownMenuTrigger that only opens the dropdown */}
        <DropdownMenuTrigger>
          <RiArrowDropDownFill className="ml-2 text-2xl text-white" />
        </DropdownMenuTrigger>
      </Link>

      {/* Dropdown menu content */}
      <DropdownMenuContent align="start">
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index}>
            {/* Link each item to its specified href */}
            <Link href={item.href}>{item.text}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdownMenu;
