import ErrorWrapper from "@/components/auth/errorWrapper";

export default function page() {
    return (
        <>
            <ErrorWrapper message="Profile does not exists! try to login!" buttonLabel="return to login" />
        </>
    )
}
