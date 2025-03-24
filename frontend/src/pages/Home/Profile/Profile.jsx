// Profile.jsx
import React, { lazy, Suspense } from "react";
import Fallback from "../../../components/Fallback";
const ProfilTemplate = lazy(() => import("./ProfilTemplate"));
const Biodata = lazy(() => import("../../../components/Profile/Biodata"));

export default function Profile() {
  return (
    <ProfilTemplate>
      <Suspense fallback={<Fallback />}>
        <Biodata />
      </Suspense>
    </ProfilTemplate>
  );
}
