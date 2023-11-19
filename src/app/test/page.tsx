'use client'

import { Button } from "@/components/ui/button";
import useRecommend from "@/hooks/useRecommend";

export default function TestPage() {
    const { getQuestion } = useRecommend();

    return (
        <div className="mx-auto flex justify-center h-screen items-center">
            <Button onClick={async () => getQuestion()}>TEST</Button>
        </div>
    );
}
