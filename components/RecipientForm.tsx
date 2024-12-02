"use client";
import { getUser, upsertRecipient } from "@/app/actions";
import { Category, Recipient, User } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type RecipientFormProps = {
  recipients: Recipient[];
  setRecipients: (recipients: Recipient[]) => void;
  recipient?: Recipient;
  setIsEditSheetOpen: (value: boolean) => void;
  editOrCreate: "edit" | "create";
};

export const RecipientForm = (props: RecipientFormProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);

  const formSchema = z.object({
    name: z.string().nullable(),
    gift: z.string().nullable(),
    shop: z.string().nullable(),
    link: z.string().nullable(),
    budget: z.coerce.number().nullable(),
    actual_budget: z.coerce.number().nullable(),
    is_purchased: z.boolean(),
    is_wrapped: z.boolean(),
    category: z.enum(
      Object.values(Category).filter((value) => typeof value === "string") as [
        string,
        ...string[],
      ]
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.recipient?.name || null,
      gift: props.recipient?.gift || null,
      shop: props.recipient?.shop || null,
      link: props.recipient?.link || null,
      budget: props.recipient?.budget || null,
      actual_budget: props.recipient?.actual_budget || null,
      is_purchased: props.recipient?.is_purchased || false,
      is_wrapped: props.recipient?.is_wrapped || false,
      category: (props.recipient?.category as unknown as string) || undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (props.editOrCreate === "edit" && props.recipient) {
      try {
        const { data, error } = await upsertRecipient({
          ...values,
          id: props.recipient.id,
          category: values.category as unknown as Category,
          user_id: props.recipient.user_id,
          created_at: props.recipient.created_at,
          updated_at: new Date().toISOString(),
        });
        if (data) {
          const updatedRecipients = props.recipients.map((recipient) => {
            if (recipient.id === props.recipient?.id) {
              return data[0];
            }
            return recipient;
          });
          props.setRecipients(updatedRecipients);
        }
      } catch (error: any) {
        console.error(error.code + " " + error.message);
      }
    } else if (props.editOrCreate === "create" && user) {
      try {
        const { data, error } = await upsertRecipient({
          ...values,
          category: values.category as unknown as Category,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (data) {
          props.setRecipients([...props.recipients, data[0]]);
        }
      } catch (error: any) {
        console.error(error.code + " " + error.message);
      }
      console.log("create");
    }
    props.setIsEditSheetOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jason"
                  {...field}
                  value={field.value as string}
                  className="ml-1 w-[97%]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gift"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Cadeau</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nintendo Switch"
                  {...field}
                  value={field.value as string}
                  className="ml-1 w-[97%]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shop"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Magasin</FormLabel>
              <FormControl>
                <Input
                  placeholder="Amazon"
                  {...field}
                  value={field.value as string}
                  className="ml-1 w-[97%]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Lien</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://www.amazon.fr"
                  {...field}
                  value={field.value as string}
                  className="ml-1 w-[97%]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Budget</FormLabel>
              <FormControl>
                <Input
                  placeholder="100"
                  {...field}
                  value={field.value as number}
                  type="number"
                  className="ml-1 w-[97%]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="actual_budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Budget actuel</FormLabel>
              <FormControl>
                <Input
                  placeholder="100"
                  {...field}
                  value={field.value as number}
                  type="number"
                  className="ml-1 w-[97%]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1">Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="ml-1 w-[97%]">
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Category)
                    .filter((value) => typeof value === "string") // Filter out the numeric keys from the enum.
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="is_purchased"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <FormLabel className="ml-1">Acheté</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="size-5 border-input"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_wrapped"
            render={({ field }) => (
              <FormItem className="space-x-3">
                <div className="flex items-center space-x-2">
                  <FormLabel className="ml-1">Emballé</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="size-5 border-input"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Enregistrer</Button>
      </form>
    </Form>
  );
};
