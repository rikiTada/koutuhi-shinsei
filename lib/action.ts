"use client";
import { FormData, formSchema } from "@/schema/schema";

const URL = process.env.NEXT_PUBLIC_POSTED_URL;
const fetchUrl = `${URL}`; //fetch時のエラー回避

export const sendEmail = async (data: FormData) => {
  const result = formSchema.safeParse(data);

  console.log(fetchUrl);
  console.log(typeof fetchUrl);

  console.log(result);
  console.log(data);

  if (!result.success) {
    return { error: result.error };
  }

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded", //GAS用
    },
    body: JSON.stringify(data),
  });

  if (!response.status) {
    return { error: "エラーが発生しました" };
  }
};
