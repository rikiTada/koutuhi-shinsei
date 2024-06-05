"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/action";
import { FormData, formSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";

export default function ContactForm({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const currentMonth = new Date().getMonth() + 1 + "";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "keiri@autumn-co.jp",
      month: currentMonth,
      name: "",
      draft: false,
      options: null,
    },
  });

  const { isDirty, isValid } = form.formState;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const result = await sendEmail(data);
    setIsLoading(false);

    if (result?.error) {
      toast.error("送信失敗", {
        description:
          "何らかの問題が発生しました。時間を置いてから、やり直してください。",
      });
    } else {
      toast.success("送信完了", {
        description: "お問い合わせを受け付けしました。",
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  return (
    <div className="w-3/4 md:w-1/2 my-16 grid gap-8 py-8 container bg-card border border-zinc-400/50 rounded-md">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/70 text-[0.75em]">
                  送信先メールアドレス
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="例)  example@example.com"
                    className="placeholder:text-muted-foreground/50"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/70 text-[0.75em]">
                  申請月
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {/* 現在の月を出力 */}

                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="placeholder:text-muted-foreground/50" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="aww-1/4 max-h-56">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                      <SelectItem key={value} value={`${value}`}>
                        {value} 月
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/70 text-[0.75em]">
                  お名前
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="例)  山田 太郎"
                    className="placeholder:text-muted-foreground/50"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="draft"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 my-4">
                <FormControl>
                  <Input type="checkbox" className="size-4" {...field} />
                </FormControl>
                <Label htmlFor="draft-mode" className="text-primary/70 pb-2">
                  下書きにする
                </Label>
              </FormItem>
            )}
          />

          {/* <FormField
            name="options"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/70 text-[0.75em]">
                  添付データ
                </FormLabel>
                <FormControl>
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    className="file:px-4 file:border-r file:mr-4 file:border-zinc-100/50"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}
          <div className="flex gap-4 my-4">
            <Button
              disabled={!isValid || !isDirty}
              type="submit"
              className="w-full"
            >
              送信
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
