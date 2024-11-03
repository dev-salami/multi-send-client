"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionType } from "../Types";
import { MdDelete, MdFrontLoader } from "react-icons/md";
import { useAddress } from "@thirdweb-dev/react";
import { LuLoader2 } from "react-icons/lu";

function DataForm({
  setTab,
  setData,
  data,
  tab,
}: {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<TransactionType[]>>;
  data: TransactionType[];
  tab: string;
}) {
  const formSchema = z.object({
    transactions: z
      .array(
        z.object({
          address: z.string().trim().min(1, "Required"),
          amount: z.number().positive("Required").min(0.0001, "Required"),
        })
      )
      .nonempty(),
  });

  const [isMounted, setMounted] = useState(false);

  const address = useAddress();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   transactions: [
    //     {
    //       address: "",
    //       amount: 0,
    //     },
    //   ],
    // },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transactions",
  });

  useEffect(() => {
    if (!isMounted) {
      setMounted(true);
    }
    const data: { transactions: TransactionType[] } = JSON.parse(
      localStorage.getItem("data")
    );
    if (data) {
      reset({ transactions: data });
    }
  }, [tab]);

  const storeData = (data: TransactionType[]) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  const onSubmit = async (data: { transactions: TransactionType[] }) => {
    console.log(data.transactions);
    setData(data.transactions);
    storeData(data.transactions);
    setTab("preview");
  };

  return (
    <div>
      {isMounted ? (
        <form
          onSubmit={handleSubmit(onSubmit)} // Properly handle submit here
          className="text-xs border border-[#00a7ff]/50 mt-4 rounded-md p-4 flex flex-col gap-3"
        >
          {fields.map((field, index) => (
            <div className="flex items-start gap-3" key={field.id}>
              <div className="flex flex-col w-full">
                <input
                  placeholder="Receiver address"
                  className={`rounded-md px-2 py-2 w-full border   bg-transparent outline-none p-2 ${
                    errors?.transactions && errors?.transactions[index]?.address
                      ? "border-red-600"
                      : "border-white"
                  }`}
                  {...register(`transactions.${index}.address`, {
                    required: true,
                  })}
                  type="text"
                  id={`transactions.${index}.address`}
                />
              </div>

              <div className="flex flex-col">
                <input
                  step={0.000001}
                  placeholder="amount"
                  className={`rounded-md px-2 py-2 w-20 border   bg-transparent outline-none p-2 ${
                    errors?.transactions && errors?.transactions[index]?.amount
                      ? "border-red-600"
                      : "border-white"
                  }`}
                  {...register(`transactions.${index}.amount`, {
                    valueAsNumber: true,
                    required: true,
                    validate: (value) => value !== 0 && "Number cannot be zero",
                  })}
                  type="number"
                  id={`transactions.${index}.amount`}
                />
              </div>

              <button
                className="flex justify-center items-center   gap-3 w-fit rounded-md p-2 h-fit text-red-600"
                type="button"
                onClick={() => remove(index)}
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button
              className="w-full text-center px-2 py-2 rounded-md bg-[#00a7ff] text-white"
              type="button"
              onClick={() =>
                append({
                  address: "",
                  amount: 0,
                })
              }
            >
              Add transactions +
            </button>
            <button
              disabled={!address}
              className="w-full text-center px-2 py-2 rounded-md bg-[#00a7ff] text-white"
              type="submit" // Corrected to type="submit" to handle form submission
            >
              Continue
            </button>
          </div>
        </form>
      ) : (
        <p className="animate-spin w-fit mx-auto mt-10">
          <LuLoader2 />
        </p>
      )}
    </div>
  );
}

export default DataForm;
