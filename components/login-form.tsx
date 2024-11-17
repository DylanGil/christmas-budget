"use client";

import { signInAction, signUpAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMessage(error);
    }
  }, [searchParams]);

  const formSchema = z.object({
    email: z.string().min(1, { message: "Veuillez entrer un email" }),
    password: z.string().min(1, { message: "Veuillez entrer un mot de passe" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "demo@gmail.com",
      password: "demo1234",
    },
  });

  async function handleSubmit(
    values: z.infer<typeof formSchema>,
    action: (email: string, password: string) => Promise<string | null>
  ) {
    setLoading(true);
    const resMessage = await action(values.email, values.password);
    if (resMessage) {
      setErrorMessage(resMessage);
    }
    setLoading(false);
  }

  return (
    <Tabs defaultValue="signin">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Se connecter</TabsTrigger>
        <TabsTrigger value="signup">S&apos;inscrire</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleSubmit(values, signInAction)
            )}
            className="mx-auto space-y-8"
          >
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Se connecter</CardTitle>
                <CardDescription>
                  Entrer un email et un mot de passe ci-dessous pour vous
                  connecter à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@exemple.com"
                            {...field}
                            aria-describedby=""
                            type="email"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">
                            Mot de passe
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mot de passe"
                              {...field}
                              aria-describedby=""
                              type="password"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {loading ? (
                    <div className="flex justify-center">
                      <Button disabled type="submit" className="w-full">
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Se connecter
                      </Button>
                    </div>
                  ) : (
                    <Button type="submit" className="w-full">
                      Se connecter
                    </Button>
                  )}
                </div>
              </CardContent>
              {errorMessage && (
                <div className="mt-2 text-center">
                  <p className="text-destructive">{errorMessage}</p>
                </div>
              )}
            </Card>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="signup">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              handleSubmit(values, signUpAction)
            )}
            className="mx-auto space-y-8"
          >
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl">S&apos;inscrire</CardTitle>
                <CardDescription>
                  Entrer un email et un mot de passe ci-dessous pour vous
                  inscrire à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@exemple.com"
                            {...field}
                            aria-describedby=""
                            type="email"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">
                            Mot de passe
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mot de passe"
                              {...field}
                              aria-describedby=""
                              type="password"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {loading ? (
                    <div className="flex justify-center">
                      <Button disabled type="submit" className="w-full">
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        S&apos;inscrire
                      </Button>
                    </div>
                  ) : (
                    <Button type="submit" className="w-full">
                      S&apos;inscrire
                    </Button>
                  )}
                </div>
              </CardContent>
              {errorMessage && (
                <div className="mt-2 text-center">
                  <p className="text-destructive">{errorMessage}</p>
                </div>
              )}
            </Card>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
