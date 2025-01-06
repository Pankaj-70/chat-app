import React from "react";
import { useAuthStore } from "../store/authStore";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="bg-base-100/80 backdrop-blur-lg fixed border-b border-base-300 w-full top-0 z-50 h-11">
      <div className="flex items-center justify-around h-full">
        <div className="icon-text">
          <MessageSquare className="text-primary"></MessageSquare>
          <h1>Chatty</h1>
        </div>
        <div className="flex items-center gap-10">
          <Link
            className="icon-text shadow-md hover:shadow-slate-500"
            to={"/settings"}
          >
            <Settings className="size-4"></Settings>
            <span className="text-sm">Settings</span>
          </Link>
          {authUser && (
            <Link className="icon-text shadow-md hover:shadow-slate-500">
              <User className="size-4" to={"/profile"}></User>
              <span className="text-sm">User</span>
            </Link>
          )}
          {authUser && (
            <button
              className="icon-text shadow-md hover:shadow-slate-500"
              onClick={logout}
            >
              <LogOut className="size-4"></LogOut>
              <span className="text-sm">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
