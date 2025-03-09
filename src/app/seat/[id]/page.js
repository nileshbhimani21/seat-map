"use client";
import { useEffect, useState } from "react";
import CreateSeat from "@/components/CreateSeat";
import Sidebar from "@/components/Sidebar";
import { SVGGenerate } from "@/components/SVGGenerate";
import { onKeyDown, onRowSelect } from "@/utils/custom";

export default function Seat() {
    const [data, setData] = useState(null);
    const [target, setTarget] = useState(null);
    console.log("data, target", data, target);

    useEffect(() => {
        document.addEventListener("click", (e) => onRowSelect(e, setTarget));
        if (target !== null) {
            document.addEventListener("keydown", (e) => onKeyDown(e, data, setData, setTarget, target), true);
        }
        return () => {
            document.removeEventListener("click", (e) => onRowSelect(e, setTarget));
            document.removeEventListener("keydown", (e) => onKeyDown(e, data, setData, setTarget, target));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);
    return <main className="flex h-screen overflow-hidden divide-x divide-gray-500 ">
        <div className="p-5 w-[80%]">
            {data?.isSeat?.length > 0 ? (
                <div
                    id="drawing"
                    className="h-screen w-screen overflow-auto"
                    dangerouslySetInnerHTML={{
                        __html: SVGGenerate(data?.isSeat, data?.stage)
                    }}
                />
            ) : (
                <CreateSeat setData={setData} />
            )}
        </div>
        <Sidebar data={data} setData={setData} setTarget={setTarget} target={target} />
    </main>
}