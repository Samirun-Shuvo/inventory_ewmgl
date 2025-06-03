export const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  {
    name: "Products",
    href: "/dashboard/products",
    submenu: [
      { name: "Product List", href: "/dashboard/products" },
      { name: "Add Product", href: "/dashboard/products/add" },
    ],
  },
  {
    name: "Users",
    href: "/dashboard/users",
    submenu: [
      { name: "User List", href: "/dashboard/users" },
      { name: "Add User", href: "/dashboard/users/add" },
    ],
  },
  {
    name: "Employee",
    href: "/dashboard/employee",
    submenu: [
      { name: "Employee List", href: "/dashboard/employee" },
      { name: "Add Employee", href: "/dashboard/employee/add" },
    ],
  },
];
