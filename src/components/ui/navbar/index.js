"use client";

import { Languages, ChevronDown, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const languages = [
	{ code: 'en', name: 'English', nativeName: 'English' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Indonesia' },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeHash, setActiveHash] = useState('#home');
	const { language, changeLanguage, t } = useLanguage();

	const navLinks = [
		{ name: t('nav.home'), href: '#home' },
		{ name: t('nav.validate'), href: '#validation' },
		{ name: t('nav.about'), href: '#about' },
		{ name: t('nav.faq'), href: '#faq' },
		{ name: t('nav.contact'), href: '#contact' },
	];

	const selectedLang = languages.find(l => l.code === language) || languages[0];

	useEffect(() => {
		const sectionIds = ['home', 'validation', 'about', 'faq', 'contact'];
		
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveHash(`#${entry.target.id}`);
					}
				});
			},
			{ threshold: 0.3 }
		);

		sectionIds.forEach((id) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			sectionIds.forEach((id) => {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, []);

	const handleLanguageChange = (lang) => {
		changeLanguage(lang.code);
		setIsOpen(false);
	};

	const handleNavClick = (e, href) => {
		e.preventDefault();
		const targetId = href.replace('#', '');
		const element = document.getElementById(targetId);
		
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-30 px-2 sm:px-4 py-5">
			<div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
				<img src="/images/certify.png" alt="Certify Logo" className="w-6 h-6 sm:w-7 sm:h-7" />
				<span className="text-xl sm:text-2xl text-[#F4F4F4] font-lexend">Certify</span>
			</div>

			<div className="flex items-center justify-center gap-1 sm:gap-2 font-lexend px-2 sm:px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mx-auto max-w-fit">
				{navLinks.map((link) => {
					const isActive = activeHash === link.href;
					return (
						<button
							key={link.name}
							onClick={(e) => handleNavClick(e, link.href)}
							className={`group relative px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
								isActive
									? 'text-[#F4F4F4]'
									: 'text-[#F4F4F4]/80'
							}`}
						>
							<span
								className={`absolute inset-0 rounded-xl transition-all duration-300 ${
									isActive
										? 'bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
										: 'bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
								}`}
							/>
							<span className="relative z-10 hidden sm:inline">{link.name}</span>
							<span className="relative z-10 sm:hidden text-xs">{link.name.charAt(0)}</span>
						</button>
					);
				})}
			</div>

			<div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
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
					<div className="absolute right-0 mt-2 w-36 sm:w-40 rounded-xl bg-gradient-to-b from-[#005461]/90 to-[#003d44]/90 border border-white/30 shadow-lg backdrop-blur-md overflow-hidden">
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => handleLanguageChange(lang)}
								className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-[#F4F4F4] hover:bg-white/10 transition flex items-center justify-between"
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
