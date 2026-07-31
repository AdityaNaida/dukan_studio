//ui component
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatNavbar from "@/components/common/ChatNavbar";
import type { Sessiontype, UserData } from "@/components/common/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSessionFromLocalStorage } from "@/lib/globalMethod";
import { useEffect, useState, type ReactNode } from "react";

//type
type DashboardProp = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardProp) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const session = localStorage.getItem("UserSession");

  useEffect(() => {
    async function fetchSession() {
      const session = (await getSessionFromLocalStorage()) as Sessiontype;

      if (session && session.user) {
        setUserData({
          _id: session.user._id,
          name: session.user.name,
          email: session.user.email,
        } as UserData);
      } else {
        console.log("No valid session found.");
      }
    }

    fetchSession();
  }, [session]);

  return (
    <SidebarProvider className="bg-gray-50" defaultOpen={true}>
      {userData && userData._id && <ChatSidebar userData={userData} />}
      <SidebarInset className="flex flex-col">
        <ChatNavbar session={session} userData={userData} />
        <div className="md:flex-1 md:overflow-auto  bg-gray-50 px-3">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
