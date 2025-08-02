import 'next';

declare module 'next' {
  export interface PageProps {
    params: Promise<Record<string, string>>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}