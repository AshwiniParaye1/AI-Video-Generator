import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
      <div>
        <Header />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
