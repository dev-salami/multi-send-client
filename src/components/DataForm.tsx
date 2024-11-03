"use client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function DataForm() {
  const formSchema = z.object({
    transactions: z
      .array(
        z.object({
          address: z.string().trim().min(1, "Required"),
          amount: z.number().positive().min(1, "Required"),
        })
      )
      .nonempty(),
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },

    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactions: [
        {
          address: "",
          amount: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <div>
        {fields.map((field, index) => (
          <div className=" grid grid-cols-3 w-full gap-2 " key={field.id}>
            <div className="flex flex-col   ">
              <input
                className="rounded-md h-10  border border-color-[#e2e8f0] bg-transparent outline-none p-2"
                {...register(`transactions.${index}.address`, {
                  required: true,
                })}
                type="date"
                id={`transactions.${index}.address`}
              />
              {errors.transactions && errors.transactions[index]?.address && (
                <span className="text-red-500 text-xs">
                  {errors.transactions[index].address.message}
                </span>
              )}
            </div>
            <div className="flex flex-col   ">
              <input
                className="rounded-md h-10  border border-color-[#e2e8f0] bg-transparent outline-none p-2"
                {...register(`transactions.${index}.amount`, {
                  required: true,
                })}
                type="date"
                id={`transactions.${index}.amount`}
              />
              {errors.transactions && errors.transactions[index]?.amount && (
                <span className="text-red-500 text-xs">
                  {errors.transactions[index].amount.message}
                </span>
              )}
            </div>

            <div className="flex flex-col   ">
              <input
                placeholder="amount"
                className="  sm2:w-auto rounded-md h-10  border border-color-[#e2e8f0] bg-transparent outline-none p-2"
                {...register(`transactions.${index}.amount`, {
                  valueAsNumber: true,
                  required: true,
                  validate: (value) => value !== 0 || "Number cannot be zero",
                })}
                type="number"
                id={`transactions.${index}.amount`}
              />
              {errors?.transactions && errors.transactions[index]?.amount && (
                <span className="text-red-500 text-xs">
                  {errors.transactions[index].amount.message}
                </span>
              )}
            </div>
            <button
              className="flex justify-center items-center     border gap-3 w-fit rounded-md p-2 text-red-600"
              type="button"
              onClick={() => remove(index)}
            >
              <span>Delete</span>
            </button>
          </div>
        ))}

        <button
          className="text-primary_blue h-10 bg-blue-100 w-fit px-6 py-2 rounded-md"
          onClick={() =>
            append({
              address: "",
              amount: 0,
            })
          }
        >
          Add transactions +
        </button>
      </div>
    </div>
  );
}

export default DataForm;
