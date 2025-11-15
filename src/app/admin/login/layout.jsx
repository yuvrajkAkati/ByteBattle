// src/app/admin/login/layout.jsx
export default function AdminLoginLayout({ children }) {
  // No sidebar/topbar here
  return (
    <div className="">
      {children}
    </div>
  );
}
