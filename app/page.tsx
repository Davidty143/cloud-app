import LoginButton from "@/components/LoginLogoutButton";
import UserGreetText from "@/components/UserGreetText";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Main Wrapper */}
      <div className="bg-red-200 min-h-screen flex justify-center">
        {/* Focus Content */}
        <div className="bg-green-200 w-[1250px] 2xl:w-[80%] flex flex-col">
          {/* Main Body */}
          <div className="bg-purple-200 w-full h-[80vh] flex flex-row justify-between">
            {/* Content Body */}
            <div className="bg-blue-200 w-full">CONTENT</div>
            {/* Sidebar Body */}
            <div className="bg-gray-200 w-[300px] flex-shrink-0">
              SIDE PANEL
            </div>
          </div>
          {/* Footer */}
          <div className="bg-orange-200 w-full h-[20vh]">FOOTER</div>
        </div>
      </div>
    </main>
  );
}
