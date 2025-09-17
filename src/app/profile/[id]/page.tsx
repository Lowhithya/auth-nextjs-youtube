export default async function UserProfile({ params }: any) {
    const Params = await params
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <br />
            
            <p className="text-4xl">Profile Page <span className="bg-orange-500 ml-2 p-1 rounded-lg">{ Params.id}</span></p>
        </div>
    )
}