"use client"
import Image from 'next/image';
// components/Sidebar.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from "@/../public/favicon.ico"

const Sidebar = () => {
  const pathname = usePathname()
  

  return (
    <div className="h-screen bg-gray-800 text-white p-4">
      <div className='relative w-8 h-8 mx-auto mb-2'>
        <Image src={logo} alt='logo' objectFit='cover' />
      </div>
      <div className="text-center text-xl font-bold mb-8">E-Presensi</div>
      <nav className="space-y-4">
        <Link href="/" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/dashboard' && 'bg-gray-700'}`}>
            Dashboard
        </Link>
        <Link href="/pegawai" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/pegawai' && 'bg-gray-700'}`}>
            Manajemen Pegawai
        </Link>
        <Link href="/laporan" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/laporan' && 'bg-gray-700'}`}>
            Laporan Presensi
        </Link>
        <Link href="/absensi" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/absensi' && 'bg-gray-700'}`}>
            Absensi
        </Link>
       
      </nav>
    </div>
  );
};

export default Sidebar;
