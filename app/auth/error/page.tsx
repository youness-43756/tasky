import ErrorWrapper from "@/components/auth/errorWrapper";
export default function page() {
    return (
        <>
            <ErrorWrapper message="Oooops! Somethings went wrong!" buttonLabel="Back to login" />
        </>
    )
}
