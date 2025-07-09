'use client';

import { Button } from '@/registry/new-york/ui/button';

export function HelloWorld() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>Hello World</h1>
      <Button onClick={() => alert('Hello World')}>Say hello</Button>
    </div>
  );
}
