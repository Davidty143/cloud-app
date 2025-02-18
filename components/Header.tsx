// Header.tsx

import HeaderDropdownMenu from "./HeaderDropDownMenu";

const Header = () => {
  // Define different menu items for each dropdown with their corresponding links
  const menu1 = [
    { text: "Profile", href: "/profile" },
    { text: "Settings", href: "/settings" },
    { text: "Log Out", href: "/logout" },
  ];
  const menu2 = [
    { text: "Dashboard", href: "/dashboard" },
    { text: "Reports", href: "/reports" },
    { text: "Analytics", href: "/analytics" },
  ];
  const menu3 = [
    { text: "Subscriptions", href: "/subscriptions" },
    { text: "Billing", href: "/billing" },
    { text: "Invoices", href: "/invoices" },
  ];
  const menu4 = [
    { text: "Team", href: "/team" },
    { text: "Projects", href: "/projects" },
    { text: "Tasks", href: "/tasks" },
  ];

  return (
    <header className="flex justify-between items-center py-4 bg-gray-400 min-w-full max-h-full space-x-4">
      {/* First Dropdown Menu with custom trigger text and main link */}
      <HeaderDropdownMenu
        menuItems={menu1}
        triggerText="Home"
        triggerLink="/"
      />

      {/* Second Dropdown Menu with custom trigger text and main link */}
      <HeaderDropdownMenu
        menuItems={menu2}
        triggerText="Forums"
        triggerLink="/forums"
      />

      {/* Third Dropdown Menu with custom trigger text and main link */}
      <HeaderDropdownMenu
        menuItems={menu3}
        triggerText="Trending"
        triggerLink="/trending"
      />

      {/* Fourth Dropdown Menu with custom trigger text and main link */}
      <HeaderDropdownMenu
        menuItems={menu4}
        triggerText="Latest"
        triggerLink="/latest"
      />
    </header>
  );
};

export default Header;
