import ErrorWrapper from "@/components/auth/errorWrapper";
import ProfilePage from "@/components/profile/profilePage";

export default async function page({ params }: { params: { u: string } }) {
    const baseUrl = process.env.NEXTAUTH_URL;
    if (!baseUrl) {
        console.error("NEXTAUTH_URL is not defined in the environment variables");
        return <ErrorWrapper message={"Server configuration error"} buttonLabel="Try again!" backUrl="dashboard" />;
    }
    let url;
    try {
        url = new URL('/api/auth/profile', baseUrl);
    } catch (error) {
        console.error("Invalid URL constructed:", error);
        return <ErrorWrapper message={"Invalid server configuration"} buttonLabel="Try again!" backUrl="dashboard" />;
    }
    try {
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: params.u }),
        });

        const res = await response.json();

        if (!response.ok) {
            console.error("API responded with an error:", res);
            return <ErrorWrapper message={res.message} buttonLabel="Try again!" backUrl="profile" />;
        }

        return <ProfilePage data={res.message} />;
    } catch (error) {
        console.error("Failed to fetch profile data:", error);
        return <ErrorWrapper message={"Ooops! Somethings went wrong!"} buttonLabel="Try again!" backUrl="dashboard" />;
    }
}
