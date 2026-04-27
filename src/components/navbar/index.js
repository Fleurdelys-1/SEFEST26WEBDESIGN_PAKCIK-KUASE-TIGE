"use client";

import { Languages } from 'lucide-react';

export default function Navbar() {
	return (
		<nav className="glass-navbar fixed top-5 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl z-30 flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
			<div className="flex items-center gap-2">
				<span className="text-2xl text-[#F4F4F4] flex items-center gap-2 font-poppins">
					<img src="/images/certify.png" alt="Certify Logo" className="w-7 h-7" />
					Certify
				</span>
			</div>
			<div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 font-poppins">
				<a href="#" className="text-[#F4F4F4]/80 hover:text-[#F4F4F4] transition text-sm font-medium">Home</a>
				<a href="#" className="text-[#F4F4F4]/80 hover:text-[#F4F4F4] transition text-sm font-medium">About</a>
				<a href="#" className="text-[#F4F4F4]/80 hover:text-[#F4F4F4] transition text-sm font-medium">Faq</a>
				<a href="#" className="text-[#F4F4F4]/80 hover:text-[#F4F4F4] transition text-sm font-medium">Contact</a>
			</div>
			<button className="p-2 rounded-lg bg-white/10 border border-white/20 shadow hover:bg-white/20 transition backdrop-blur-sm">
				<Languages size={18} className="text-[#F4F4F4]" />
			</button>
		</nav>
	);
}
