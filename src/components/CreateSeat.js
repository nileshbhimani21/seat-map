import React from "react";
import { useForm } from "react-hook-form";
import { jsonGenerate } from "./SeatNumber";

export default function CreateSeat({ setData }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      rows: 0,
      columns: 0
    }
  });
  const onSubmit = (data) => {
    if (Object.keys(errors).length === 0) {
      setData({isSeat: jsonGenerate(data)});
    }
  };
  return (
    <div className="p-2 border border-gray-500 w-[300px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <div>Rows</div>
          <input
            className="p-1 w-full border border-gray-500 bg-transparent text-blue-500"
            type="number"
            {...register("rows", { required: true, min: 1 })}
          />
          {errors.rows && errors.rows.type === "required" && <span className="text-red-700">Rows is required</span>}
          {errors.rows && errors.rows.type === "min" && <span className="text-red-700">Rows minimum 1 allow</span>}
        </div>
        <div className="mb-2">
          <div>columns</div>
          <input
            className="p-1 w-full border border-gray-500 bg-transparent text-blue-500"
            type="number"
            {...register("columns", { required: true, min: 1 })}
          />
          {errors.columns && errors.columns.type === "required" && (
            <span className="text-red-700">columns is required</span>
          )}
          {errors.columns && errors.columns.type === "min" && (
            <span className="text-red-700">columns minimum 1 allow</span>
          )}
        </div>
        <button className="px-2 border-2 border-blue-500 text-blue-500" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
 