import LoginForm from "../ui/login-form";
import ZamnetLogo from "../ui/zamnet-logo";
import Image from "next/image";
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen p-6 bg-orange-400  bg-cover bg-bottom bg-no-repeat"
     style={{ backgroundImage: "url('/digitization.jpg')" }}>
      {/* <Image src='/digitization.jpg' width={1280} height={850} alt="image" className=""/> */}
      <div className="w-96">
      <LoginForm />
      </div>
      
    </main>
  );
}
