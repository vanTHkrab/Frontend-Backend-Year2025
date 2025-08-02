'use client'
import React, {use} from 'react';
import Image from "next/image";

export default function ProfilePage({
                                        params,
                                    }: {
    params: Promise<{ id: string[] }>
}) {

    const {id} = use(params);

    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
                <p className="text-2xl">Welcome to the profile page!</p>

                <p className="text-xl mt-2">Your ID is: <span className="font-mono">{id ? id: "unknown"}</span></p>
                <div className="mt-4">
                    <Image
                        src="/assets/images.jpeg"
                        alt="Profile Placeholder"
                        width={250}
                        height={250}
                        className="rounded-2xl mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};
