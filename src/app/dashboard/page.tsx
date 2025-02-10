import Card from "@/components/card";

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-4xl font-black text-center mt-8 mb-8">Dashboard</h1>
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 max-h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 md:mx-20 gap-y-0 my-0">
                    <Card titolo="In Corso" />
                    <Card titolo="Da Fare" />
                    <Card titolo="Fatto" />
                </div>
            </div>
        </div>
    );
}