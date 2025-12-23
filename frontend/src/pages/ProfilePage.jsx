// ProfilePage.jsx
import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="overflow-x-hidden">
      <Header />

      {/* FULL WIDTH BACKGROUND */}
      <div className="w-full bg-gradient-to-br from-[#f5f5f5] to-[#f2f4f7] py-12 min-h-screen">
        <div className={`${styles.section} flex flex-col md:flex-row gap-4`}>
          {/* SIDEBAR */}
          <div className="w-full md:w-[100px] sticky top-0 flex justify-center md:justify-start ">
            <ProfileSideBar active={active} setActive={setActive} />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 flex justify-center p-2 md:p-6 w-full">
            <div className="w-full max-w-full md:max-w-5xl">
              <ProfileContent active={active} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
