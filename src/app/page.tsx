import { getServerSession } from "next-auth";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        await db
            .insert(userTable)
            .values({
                name: session.user.name as string,
                email: session.user.email as string,
            })

            .onConflictDoUpdate({
                target: userTable.email,
                set: {
                    name: session.user.name as string,
                },
            })
            .execute();
    }

    return (
        <div className="w-full p-6">
            <div className="rounded-lg bg-[#F0F0F0] p-10 text-center grid grid-cols-1 gap-7">
                <p className="font-bold text-5xl">Picbook Home</p>
                <p>SloganSloganSloganSloganSloganSloganSloganSloganSlogan</p>
                <Button className="w-1/4 mx-auto text-xl p-6">Start</Button>
            </div>

            <Separator className="my-8"></Separator>

            <div className="flex items-center p-10 px-36">
                <p className="font-bold text-3xl">Picbook Home</p>
                <div className="grid grid-cols-1 gap-4 ml-[20%]">
                    <p className="text-xl">Picbook Home Picbook</p>
                    <p className="text-xl">Picbook Home</p>
                    <p className="text-xl">Picbook </p>
                    <p className="text-xl">Picbook Home Picbook Home</p>
                    <p className="text-xl">Picbook Home Picbook Home Picbook Home</p>
                </div>
            </div>
        </div>
    );
}
