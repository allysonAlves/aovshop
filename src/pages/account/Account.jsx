import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileComp from "./components/profileCard/ProfileComp";
import { AuthContext } from "../../commom/context/AuthProvider";
import CreditCard from "./components/creditCard/CreditCard";

import "./Account.css";

const Account = () => {
  const { user, loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loadingUser) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="account-page bg-aov-dark-0">
      <div className="page-limit">
        <div className="w-full justify-content-xl-evenly justify-content-lg-between flex-wrap">
          <ProfileComp isLoading={loadingUser} user={user} />
        </div>

        <div className="account-data">
          <h3>Cartões</h3>
          <div className="data">
            <CreditCard isLoading={loadingUser} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
