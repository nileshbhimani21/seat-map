import { deleteSeat, onMove, reverseNumber } from '@/utils/custom'
import React from 'react'

export default function Sidebar({ data, setData, setTarget, target }) {
    return (
        <div className="px-2 w-[20%]">
            <h1 className="text-center pt-3 text-2xl">Seats Map</h1>
            {data?.isSeat?.length > 0 ? <>
                <button type="button" className="px-2 border-2 border-gray-500 mr-2 mb-2" onClick={() => setData({...data, stage:{cx:20,cy:20}})}>Stage</button>
                <button type="button" className="px-2 border-2 border-gray-500 mr-2 mb-2" onClick={() => reverseNumber("row", data, setData)}>Row reverse</button>
                <button type="button" className="px-2 border-2 border-gray-500 mr-2 mb-2" onClick={() => reverseNumber("seat", data, setData)}>Seat reverse</button>
            </> : null}
            {target !== null ? (
                <>
                {target?.type === "seat" ?<h6 className="text-center mb-3">{target?.row + "-" + target?.number}</h6>:target?.type === "stage" ? <h6 className="text-center mb-3">Stage</h6>:null }
                    
                    <div className="mb-3">
                        <label className="w-full mr-3">Seat Move</label>
                        <button type="button" className="w-8 border-2 border-gray-500 mr-2" onClick={() => onMove("cx", "minus", data, setData, setTarget, target)}>
                            &larr;
                        </button>
                        <button type="button" className="w-8 border-2 border-gray-500 mr-2" onClick={() => onMove("cx", "plus", data, setData, setTarget, target)}>
                            &rarr;
                        </button>
                        <button type="button" className="w-8 border-2 border-gray-500 mr-2" onClick={() => onMove("cy", "minus", data, setData, setTarget, target)}>
                            &uarr;
                        </button>
                        <button type="button" className="w-8 border-2 border-gray-500" onClick={() => onMove("cy", "plus", data, setData, setTarget, target)}>
                            &darr;
                        </button>
                    </div>
                    <div className="mb-3">
                        <label className="w-full mr-3">Seat Delete</label>
                        <button className="px-2 border-2 border-gray-500" onClick={() => deleteSeat(data, setData, setTarget, target)}>
                            Delete
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    )
}
