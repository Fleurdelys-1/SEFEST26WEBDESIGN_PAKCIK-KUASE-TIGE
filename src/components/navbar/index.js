"use client";

import { Languages, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const languages = [
	{ code: 'en', name: 'English', nativeName: 'English' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Indonesia' },
];

export default function Navbar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const { language, changeLanguage, t } = useLanguage();

	const navLinks = [
		{ name: t('nav.home'), href: '/' },
		{ name: t('nav.validate'), href: '/validate' },
		{ name: t('nav.about'), href: '/about' },
		{ name: t('nav.faq'), href: '/faq' },
		{ name: t('nav.contact'), href: '/contact' },
	];

	const selectedLang = languages.find(l => l.code === language) || languages[0];

	const handleLanguageChange = (lang) => {
		changeLanguage(lang.code);
		setIsOpen(false);
	};

	return (
		<nav className="fixed top-3 left-0 right-0 z-30 px-0 py-3">
			{/* Logo & Text - Left Corner - Absolute to viewport */}
			<div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
				<img src="/images/certify.png" alt="Certify Logo" className="w-7 h-7" />
				<span className="text-2xl text-[#F4F4F4] font-lexend">Certify</span>
			</div>

			{/* Nav Links - Glass Effect - Centered */}
			<div className="flex items-center justify-center gap-2 font-lexend px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mx-auto max-w-fit">
				{navLinks.map((link) => {
					const isActive = pathname === link.href;
					return (
						<Link
							key={link.name}
							href={link.href}
							className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
								isActive
									? 'text-[#F4F4F4]'
									: 'text-[#F4F4F4]/80 hover:text-[#F4F4F4]'
							}`}
						>
							{/* Glass effect background */}
							<span
								className={`absolute inset-0 rounded-xl transition-all duration-300 ${
									isActive
										? 'bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
										: 'bg-white/0 hover:bg-gradient-to-r hover:from-[#005461]/20 hover:to-[#F4F4F4]/10 hover:border hover:border-white/20 hover:shadow-lg hover:backdrop-blur-md'
								}`}
							/>
							<span className="relative z-10">{link.name}</span>
						</Link>
					);
				})}
			</div>

			{/* Language Dropdown - Right Corner - Absolute to viewport */}
			<div className="absolute right-4 top-1/2 -translate-y-1/2">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="p-3 rounded-lg bg-white/10 border border-white/20 shadow hover:bg-white/20 transition backdrop-blur-sm flex items-center gap-1"
				>
					<Languages size={18} className="text-[#F4F4F4]" />
					<ChevronDown
						size={14}
						className={`text-[#F4F4F4] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
					/>
				</button>
				{isOpen && (
					<div className="absolute right-0 mt-2 w-40 rounded-xl bg-gradient-to-b from-[#005461]/90 to-[#003d44]/90 border border-white/30 shadow-lg backdrop-blur-md overflow-hidden">
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => handleLanguageChange(lang)}
								className="w-full px-4 py-2 text-left text-sm text-[#F4F4F4] hover:bg-white/10 transition flex items-center justify-between"
							>
								<span>{lang.nativeName}</span>
								{selectedLang.code === lang.code && (
									<Check size={14} className="text-[#F4F4F4]" />
								)}
							</button>
						))}
					</div>
				)}
			</div>
		</nav>
	);
}
