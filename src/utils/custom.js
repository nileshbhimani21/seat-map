import { seatNumber } from "@/components/SeatNumber";

export function deleteSeat(data, setData, setTarget, target) {
  if(target?.type === "seat"){
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
    });
    
    setData({ ...data, isSeat: array?.filter((x) => x) });
  }
  if(target?.type === "stage"){
    delete data?.stage
    setData(data);
  }
  setTarget(null);
};

export function onKeyDown(e, data, setData, setTarget, target) {
    if (e?.key === "Delete" && target !== null) {
        deleteSeat(data, setData, setTarget, target);
    }
}

export function onRowSelect(e, setTarget) {
    if (e?.target?.parentNode?.className?.animVal === "seat") {
      let parent = e?.target?.parentNode?.getElementsByTagName("circle")[0];
      setTarget({
        type:"seat",
        cx: parent?.cx?.animVal?.value,
        cy: parent?.cy?.animVal?.value,
        row: seatNumber(e?.target?.parentNode?.id)[0],
        number: seatNumber(e?.target?.parentNode?.id)[1]
      });
    }
    if (e?.target?.parentNode?.className?.animVal === "stage") {
      let parent = e?.target?.parentNode?.getElementsByTagName("rect")[0];
      setTarget({
        type:"stage",
        cx: parent?.x?.animVal?.value,
        cy: parent?.y?.animVal?.value,
      });
    }
  }

  export function reverseNumber (type, data, setData) {
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

  export function onMove(side, count, data, setData, setTarget, target) {
    if (side === "cx") {
      if (count === "plus") {
        if(target?.type === "seat"){
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
        }
        if(target?.type === "stage"){
          setData({...data, stage:{...data?.stage, cx: target?.cx + 10}});
          setTarget({ ...target, cx: target?.cx + 10 });
        }
       
      } else {
        if(target?.type === "seat"){
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
      if(target?.type === "stage"){
        setData({...data, stage:{...data?.stage,cx: target?.cx - 10}});
        setTarget({ ...target, cx: target?.cx - 10 });
      }
      }
    } else {
      if (count === "plus") {
        if(target?.type === "seat"){
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
      }
      if(target?.type === "stage"){
        setData({...data, stage:{...data?.stage, cy: target?.cy + 10}});
        setTarget({ ...target, cy: target?.cy + 10 });
      }
      } else {
        if(target?.type === "seat"){
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
      if(target?.type === "stage"){
        setData({...data, stage:{...data?.stage, cy: target?.cy - 10}});
        setTarget({ ...target, cy: target?.cy - 10 });
      }
      }
    }
  };