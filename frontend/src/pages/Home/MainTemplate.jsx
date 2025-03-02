import React from "react";
import TimerToaster from "../../components/TimerToaster";
import Navbar from "../../layout/Main/Navbar";
import useAuth from "../../hooks/useAuth";

export default function MainTemplate({ children }) {
  const { user } = useAuth();
  return (
    <div className="home-container">
      <TimerToaster />
      <Navbar user={user} />
      {children}
    </div>
  );
}
