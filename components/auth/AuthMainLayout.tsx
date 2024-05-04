import AuthFormPage from "@/components/auth/AuthForm";
import Header from "../header/header";
import Footer from "../footer/Footer";
export default function AuthMainLayout() {
    return (
        <div className="flex flex-col gap-6 min-h-screen">
            <Header />
            <div className="w-full grow flex items-start justify-center">
                <AuthFormPage />
            </div>
            <Footer />
        </div>
    )
}