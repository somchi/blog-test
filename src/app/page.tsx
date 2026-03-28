import { LOGIN } from '@/site-settings/navigations';
import { redirect } from 'next/navigation';
import { Mode } from './_libs/enums';

export default function Home() {
  redirect(`${LOGIN.href}?mode=${Mode.Login}`);
}
