import LoginForm from "../ui/login-form";
import ZamnetLogo from "../ui/zamnet-logo";
import Image from "next/image";
export default async function LoginPage({ searchParams, params }) {
  const callback = (await searchParams).callback;
  const signature = (await searchParams).signature;

  console.log("search on loginPage: ", callback, signature);
  return (
    <main
      className="flex items-center justify-center h-screen p-6 bg-orange-400  bg-cover bg-bottom bg-no-repeat"
      style={{ backgroundImage: "url('/digitization.jpg')" }}
    >
      {/* <Image src='/digitization.jpg' width={1280} height={850} alt="image" className=""/> */}
      <div className="w-96">
        <LoginForm callback={callback} signature={signature} />
      </div>
    </main>
  );
}
