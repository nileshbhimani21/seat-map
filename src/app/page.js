"use client";
import { canvasDrow2 } from "@/components/Canvas";
import CreateSeat from "@/components/CreateSeat";
import { seatNumber } from "@/components/SeatNumber";
import { SVGGenerate } from "@/components/SVGGenerate";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [target, setTarget] = useState(null);
  console.log("data, target", data, target);

  useEffect(() => {
    
    // canvasDrow2(data.isSeat);
    document.addEventListener("click", onRowSelect);
    if (target !== null) {
      document.addEventListener("keydown", onKeyDown, true);
    }
    return () => {
      document.removeEventListener("click", onRowSelect);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  function onRowSelect(e) {
    if (e?.target?.parentNode?.className?.animVal === "seat") {
      let parent = e?.target?.parentNode?.getElementsByTagName("circle")[0];
      setTarget({
        cx: parent?.cx?.animVal?.value,
        cy: parent?.cy?.animVal?.value,
        row: seatNumber(e?.target?.parentNode?.id)[0],
        number: seatNumber(e?.target?.parentNode?.id)[1]
      });
    }
  }

  function onKeyDown(e) {
    if (e?.key === "Delete" && target !== null) {
      deleteSeat();
    }
  }

  const onMove = (side, count) => {
    if (side === "cx") {
      if (count === "plus") {
        let array = data?.isSeat?.map((x) => {
          if (x?.row === target?.row) {
            let subArray = x?.rowData?.length > 0 ? x?.rowData?.map(y => {
                if (y?.number === target.number) {
                  return { ...y, cx: y?.cx + 10 };
                }
                return y
            }) : []
            return {
              ...x, rowData: subArray?.filter((x) => x)
            }
          } else {
            return x
          }          
        });
        setData({...data, isSeat:array});
        setTarget({ ...target, cx: target?.cx + 10 });
      } else {
        let array = data?.isSeat?.map((x) => {         
          if (x?.row === target?.row) {
            let subArray = x?.rowData?.length > 0 ? x?.rowData?.map(y => {
                if (y?.number === target.number) {
                  return { ...y, cx: y?.cx - 10 };
                }
                return y
            }) : []
            return {
              ...x, rowData: subArray?.filter((x) => x)
            }
          } else {
            return x
          }
        });
        setData({...data, isSeat:array});
        setTarget({ ...target, cx: target?.cx - 10 });
      }
    } else {
      if (count === "plus") {
        let array = data?.isSeat?.map((x) => {         
          if (x?.row === target?.row) {
            let subArray = x?.rowData?.length > 0 ? x?.rowData?.map(y => {
                if (y?.number === target.number) {
                  return { ...y, cy: y?.cy + 10 };
                }
                return y
            }) : []
            return {
              ...x, rowData: subArray?.filter((x) => x)
            }
          } else {
            return x
          } 
        });
        setData({...data, isSeat:array});
        setTarget({ ...target, cy: target?.cy + 10 });
      } else {
        let array = data?.isSeat?.map((x) => {         
          if (x?.row === target?.row) {
            let subArray = x?.rowData?.length > 0 ? x?.rowData?.map(y => {
                if (y?.number === target.number) {
                  return { ...y, cy: y?.cy - 10 };
                }
                return y
            }) : []
            return {
              ...x, rowData: subArray?.filter((x) => x)
            }
          } else {
            return x
          } 
        });
        setData({...data, isSeat:array});
        setTarget({ ...target, cy: target?.cy - 10 });
      }
    }
  };
  const deleteSeat = async () => {
    let array = data?.isSeat?.map((x) => {
      if (x?.row === target?.row) {
        let subArray = x?.rowData?.length > 0 ? x?.rowData?.map(y => {
          if (y?.number !== target.number) {
            if (target.number < y?.number) {
              return { ...y, number: y?.number - 1 };
            }
            return y
          }
        }) : []
        return {
          ...x, rowData: subArray?.filter((x) => x)
        }
      } else {
        return x
      }
      // if (x?.cx === target.cx && x?.cy === target.cy) {
      //   return;
      // } else {
      //   if (x?.cy === target.cy && target.number < x?.number) {
      //     return { ...x, number: x?.number - 1 };
      //   }
      //   return x;
      // }
    });

    setData({...data, isSeat:array?.filter((x) => x)});
    setTarget(null);
  };

  const reverseNumber = (type) => {
    if(type === "row"){
      const rows = data?.isSeat?.map((x,i) => {
        return {...x,rowData: data?.isSeat[data?.isSeat?.length - (i + 1)]?.rowData}
      })
      setData({...data, isSeat:rows});
    } else {
      const seat = data?.isSeat?.map((x) => {
        return {...x,rowData: x?.rowData?.map((y,i)=> {
          return  {...y,number: x?.rowData[x?.rowData?.length - (i + 1)]?.number}
        })}
      })
      setData({...data, isSeat:seat});
    }
  }

  return (
    <main className="flex h-screen overflow-hidden divide-x divide-gray-500 ">
      {/* <canvas id="myCanvas" width="500" height="500">
        Your browser does not support the HTML canvas tag.
      </canvas> */}
      {/* <canvas id="canvasDrow" /> */}
      <div className="px-2 min-w-80">
        <h1 className="text-center pt-3 text-2xl">Seats Map</h1>
        <button type="button" className="px-2 border-2 border-gray-500 mr-2" onClick={()=>reverseNumber("row")}>Row reverse</button>
        <button type="button" className="px-2 border-2 border-gray-500 mr-2" onClick={()=>reverseNumber("seat")}>Seat reverse</button>
        {target !== null ? (
          <>
            <h6 className="text-center mb-3">{target?.row + "-" + target?.number}</h6>
            <div className="mb-3">
              <label className="w-full mr-3">Seat Move</label>
              <button type="button" className="w-8 border-2 border-gray-500 mr-2" onClick={() => onMove("cx", "minus")}>
                &larr;
              </button>
              <button type="button" className="w-8 border-2 border-gray-500 mr-2" onClick={() => onMove("cx", "plus")}>
                &rarr;
              </button>
              <button type="button" className="w-8 border-2 border-gray-500 mr-2" onClick={() => onMove("cy", "minus")}>
                &uarr;
              </button>
              <button type="button" className="w-8 border-2 border-gray-500" onClick={() => onMove("cy", "plus")}>
                &darr;
              </button>
            </div>
            <div className="mb-3">
              <label className="w-full mr-3">Seat Delete</label>
              <button className="px-2 border-2 border-gray-500" onClick={deleteSeat}>
                Delete
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div className="p-5">
        {data?.isSeat?.length > 0 ? (
          <div
            id="drawing"
            className="h-screen w-screen overflow-auto"
            dangerouslySetInnerHTML={{
              __html: SVGGenerate(data?.isSeat)
            }}
          />
        ) : (
          <CreateSeat setData={setData} />
        )}
      </div>
    </main>
  );
}
