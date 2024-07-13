'use client';

import { registerWithEmail } from '@/app/actions/register-with-email';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { supabaseBrowserClient } from '@/supabase/supabaseClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSlack } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { RxGithubLogo } from 'react-icons/rx';
import { z } from 'zod';

const Page = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  // session がなかったら取得する。
  // session があれば / にリダイレクトする。
  // router は navigation を操作するオブジェクト
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();

      if (session) {
        return router.push('/');
      }
    };
    getCurrentUser();
    setIsMounted(true);
  }, [router]);

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: 'Some message' })
      .min(2, { message: 'Email must be 2 characters' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    const response = await registerWithEmail(values);
    const { data, error } = JSON.parse(response);
    setIsAuthenticating(false);
    if (error) {
      console.warn('Sign in error', error);
      return;
    }
  }

  async function socialAuth(provider: Provider) {
    setIsAuthenticating(true);
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsAuthenticating(false);
  }

  if (!isMounted) return null;

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Slackzz" variant="h2" />
        </div>
        <Typography
          text="Sign in to your Slackzz"
          variant="h2"
          className="mb-3"
        />

        <div className="flex flex-col space-y-4">
          <Button
            disabled={true}
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth('google')}
          >
            <FcGoogle size={30} />
            <Typography
              className="text-lx"
              text="Sign in with Google"
              variant="p"
            />
          </Button>
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth('github')}
          >
            <RxGithubLogo size={30} />
            <Typography
              className="text-lx"
              text="Sign in with Github"
              variant="p"
            />
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticating}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="name@work-email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="secondary"
                  className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                  type="submit"
                >
                  <Typography text="Sign in with Email" variant="p" />
                </Button>
                <div className="px-5 py-4 bg-gray-100 rounded-sm">
                  <div className="text-gray-500 flex items-center space-x-3">
                    <MdOutlineAutoAwesome />
                    <Typography
                      text="We will email you a magic link for a password-free sing-in"
                      variant="p"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
