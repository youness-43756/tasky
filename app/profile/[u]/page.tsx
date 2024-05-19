import ErrorWrapper from "@/components/auth/errorWrapper";
import ProfilePage from "@/components/profile/profilePage";

export default async function page({ params }: { params: { u: string } }) {
    const baseUrl = process.env.NEXTAUTH_URL;
    const url = new URL('/api/auth/profile', baseUrl);
    try {
        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: params.u }),
        })
        const res = await response.json();
        if (!response.ok) {
            return <ErrorWrapper message={res.message} buttonLabel="Try again!" backUrl="profile" />
        }
        return <ProfilePage data={res.message} />

    } catch (error) {
        console.error(error);
    }
    return <ErrorWrapper message={"Ooops! Somethings went wrong!"} buttonLabel="Try again!" backUrl="dashboard" />
}
