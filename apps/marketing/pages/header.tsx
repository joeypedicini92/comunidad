import Link from 'next/link';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Docs', href: '#' },
];

export default function Header() {
  return (
    <header className="bg-indigo-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <div className="cursor-pointer">
                <span className="sr-only">Your Company</span>
                <img className="h-10 w-auto" src="logo.png" alt="" />
              </div>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span className="text-base font-medium text-white hover:text-indigo-50 cursor-pointer">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="https://comunidaddies.web.app"
              className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Visit App
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
