import React, { memo, useMemo } from "react";
import TimerToaster from "../../components/TimerToaster";
import Navbar from "../../layout/Main/Navbar";
import useAuth from "../../hooks/useAuth";

const MainTemplate = memo(({ children }) => {
  const { user, isLoading } = useAuth();

  // Memoize user data untuk mencegah re-render yang tidak perlu
  const memoizedUser = useMemo(() => user, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <TimerToaster />
      <Navbar user={memoizedUser} />
      {children}
    </div>
  );
});

MainTemplate.displayName = "MainTemplate";

export default MainTemplate;
