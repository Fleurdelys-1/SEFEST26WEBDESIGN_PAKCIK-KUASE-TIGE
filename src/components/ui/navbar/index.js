"use client";

import { Languages, ChevronDown, Check, Menu, X, SquarePen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
	{ code: 'en', name: 'English', nativeName: 'English' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Indonesia' },
];

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeHash, setActiveHash] = useState(null);
	const { language, changeLanguage, t } = useLanguage();

	const navLinks = [
		{ name: t('nav.home'), href: '#home' },
		{ name: t('nav.validate'), href: '#validation' },
		{ name: t('nav.about'), href: '#about' },
		{ name: t('nav.faq'), href: '#faq' },
		{ name: t('nav.contact'), href: '#contact' },
	];

	const selectedLang = languages.find(l => l.code === language) || languages[0];

	

	const dropdownVariants = {
		hidden: { opacity: 0, y: -8, scale: 0.97 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.2, ease: 'easeOut', staggerChildren: 0.05, delayChildren: 0.05 },
		},
		exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
	};

	const menuItemVariants = {
		hidden: { opacity: 0, y: -8 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' } },
	};

	const navListVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.35, ease: 'easeOut', when: 'beforeChildren', delayChildren: 0.18, staggerChildren: 0.08 },
		},
	};

	const navItemVariants = {
		hidden: { opacity: 0, y: -18 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
	};

	const switchButtonVariants = {
		hidden: { x: 16, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: { duration: 0.35, ease: 'easeOut', when: 'beforeChildren', delayChildren: 0.12, staggerChildren: 0.08 },
		},
	};

	const switchIconVariants = {
		hidden: { y: -10, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
	};

	const logoContainerVariants = {
		hidden: { opacity: 0, filter: "blur(10px)" },
		visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
	};

	const navLogoVariants = {
		hidden: { x: -50, opacity: 0 },
		visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.6, ease: 'easeOut' } },
	};

	const navTextVariants = {
		hidden: { x: -50, opacity: 0 },
		visible: { x: 0, opacity: 1, transition: { delay: 0.8, duration: 0.6, ease: 'easeOut' } },
	};

	
	const mobileOverlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
		exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
	};

	const mobileMenuVariants = {
		hidden: { opacity: 0, x: -40 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], when: 'beforeChildren', staggerChildren: 0.07, delayChildren: 0.1 },
		},
		exit: {
			opacity: 0,
			x: -30,
			transition: { duration: 0.25, ease: 'easeIn' },
		},
	};

	const mobileLinkVariants = {
		hidden: { opacity: 0, x: -24, filter: 'blur(6px)' },
		visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
	};

	

	useEffect(() => {
		if (pathname !== '/') {
			setActiveHash(null);
			return;
		}

		const sectionIds = ['home', 'validation', 'about', 'faq', 'contact'];
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
				});
			},
			{ threshold: 0.3 }
		);

		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => {
			sectionIds.forEach((id) => {
				const el = document.getElementById(id);
				if (el) observer.unobserve(el);
			});
		};
	}, [pathname]);

	
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setMobileMenuOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => { document.body.style.overflow = ''; };
	}, [mobileMenuOpen]);

	

	const handleLanguageChange = (lang) => {
		changeLanguage(lang.code);
		setIsOpen(false);
	};

	const handleRegister = () => {
		setMobileMenuOpen(false);
		router.push('/register');
	};

	const handleNavClick = (e, href) => {
		e.preventDefault();
		setMobileMenuOpen(false);
		const targetId = href.replace('#', '');

		if (pathname === '/') {
			const element = document.getElementById(targetId);
			if (element) element.scrollIntoView({ behavior: 'smooth' });
		} else {
			router.push(`/#${targetId}`);
		}
	};

	

	return (
		<>
			<nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-5 pointer-events-none">

				{}
				<div className="hidden md:block">
					{}
					<motion.div
						className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer z-40 pointer-events-auto"
						variants={logoContainerVariants}
						initial="hidden"
						animate="visible"
						onClick={(e) => handleNavClick(e, '#home')}
					>
						<motion.img src="/images/certify.png" alt="Certify Logo" className="w-6 h-6 sm:w-7 sm:h-7" variants={navLogoVariants} />
						<motion.span className="text-xl sm:text-2xl text-[#F4F4F4] font-lexend" variants={navTextVariants}>Certify</motion.span>
					</motion.div>

					{}
					<motion.div
						className="flex items-center justify-center gap-1 sm:gap-2 font-lexend px-2 sm:px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mx-auto max-w-fit pointer-events-auto"
						variants={navListVariants}
						initial="hidden"
						animate="visible"
					>
						{navLinks.map((link) => {
							const isActive = activeHash === link.href;
							return (
								<motion.button
									key={link.name}
									onClick={(e) => handleNavClick(e, link.href)}
									variants={navItemVariants}
									className={`group relative overflow-hidden px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${isActive ? 'text-[#F4F4F4]' : 'text-[#F4F4F4]/80'}`}
								>
									<span
										className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-300 ease-out ${isActive
											? 'w-full bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md'
											: 'w-0 group-hover:w-full bg-white/0 group-hover:bg-gradient-to-r group-hover:from-[#005461]/20 group-hover:to-[#F4F4F4]/10 group-hover:border group-hover:border-white/20 group-hover:shadow-lg group-hover:backdrop-blur-md'
											}`}
									/>
									<span className="relative z-10">{link.name}</span>
								</motion.button>
							);
						})}
					</motion.div>

					{}
					<motion.div
						className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2 font-lexend px-2 sm:px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg pointer-events-auto"
						variants={switchButtonVariants}
						initial="hidden"
						animate="visible"
					>
						<motion.button
							onClick={() => setIsOpen(!isOpen)}
							variants={switchIconVariants}
							className="group relative overflow-hidden px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[#F4F4F4] transition-all duration-300 flex items-center gap-1 hover:bg-white/10"
						>
							<Languages size={16} className="text-[#F4F4F4]" />
							<ChevronDown
								size={12}
								className={`text-[#F4F4F4] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
							/>
						</motion.button>

						<div className="w-px h-5 bg-white/10" />

						<motion.button
							onClick={handleRegister}
							variants={switchIconVariants}
							className="group relative overflow-hidden px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-[#F4F4F4] transition-all duration-300"
						>
							<span className="absolute inset-0 rounded-lg transition-all duration-300 ease-out bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30 shadow-lg backdrop-blur-md" />
							<span className="relative z-10">{t('nav.register')}</span>
						</motion.button>

						<AnimatePresence>
							{isOpen && (
								<motion.div
									className="absolute right-0 top-full mt-2 w-36 sm:w-40 rounded-xl bg-gradient-to-b from-[#005461]/90 to-[#003d44]/90 border border-white/30 shadow-lg backdrop-blur-md overflow-hidden origin-top-right"
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={dropdownVariants}
								>
									{languages.map((lang) => (
										<motion.button
											key={lang.code}
											onClick={() => handleLanguageChange(lang)}
											variants={menuItemVariants}
											className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm text-[#F4F4F4] hover:bg-white/10 transition flex items-center justify-between"
										>
											<span>{lang.nativeName}</span>
											{selectedLang.code === lang.code && <Check size={14} className="text-[#F4F4F4]" />}
										</motion.button>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</div>

				{}
				<motion.div
					className="flex md:hidden items-center justify-between px-2 py-2 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg pointer-events-auto mx-1"
					variants={navListVariants}
					initial="hidden"
					animate="visible"
				>
					{}
					<div className="flex items-center gap-1">
						<button
							onClick={() => setMobileMenuOpen(true)}
							className="p-2 rounded-xl text-[#F4F4F4] hover:bg-white/10 transition-colors duration-200 flex-shrink-0"
							aria-label="Open menu"
						>
							<Menu size={20} />
						</button>
						<button
							onClick={(e) => handleNavClick(e, '#home')}
							className="flex items-center gap-1.5 px-1"
						>
							<img src="/images/certify.png" alt="Certify Logo" className="w-5 h-5" />
							<span className="text-base text-[#F4F4F4] font-lexend font-semibold">Certify</span>
						</button>
					</div>

					{}
					<div className="flex items-center gap-1 flex-shrink-0 relative">
						{}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="p-2 rounded-xl text-[#F4F4F4] hover:bg-white/10 transition-colors duration-200 flex items-center gap-0.5"
							aria-label="Switch language"
						>
							<Languages size={18} />
							<ChevronDown size={11} className={`text-[#F4F4F4]/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
						</button>

						{}
						<button
							onClick={handleRegister}
							className="p-2 rounded-lg text-[#F4F4F4] transition-colors duration-200 flex items-center justify-center relative overflow-hidden"
							aria-label="Register"
						>
							<span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#005461]/30 to-[#F4F4F4]/20 border border-white/30" />
							<SquarePen size={18} className="relative z-10" />
						</button>

						{}
						<AnimatePresence>
							{isOpen && (
								<motion.div
									className="absolute right-0 top-full mt-2 w-36 rounded-xl bg-gradient-to-b from-[#005461]/95 to-[#003d44]/95 border border-white/30 shadow-xl backdrop-blur-md overflow-hidden origin-top-right z-50"
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={dropdownVariants}
								>
									{languages.map((lang) => (
										<motion.button
											key={lang.code}
											onClick={() => handleLanguageChange(lang)}
											variants={menuItemVariants}
											className="w-full px-4 py-3 text-left text-sm text-[#F4F4F4] hover:bg-white/10 transition flex items-center justify-between"
										>
											<span>{lang.nativeName}</span>
											{selectedLang.code === lang.code && <Check size={14} className="text-[#F4F4F4]" />}
										</motion.button>
									))}
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</nav>

			{}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						className="fixed inset-0 z-[60] md:hidden"
						variants={mobileOverlayVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{}
						<div
							className="absolute inset-0 bg-black/20 backdrop-blur-xl"
							onClick={() => setMobileMenuOpen(false)}
						/>

						{}
						<motion.div
							className="absolute inset-0 flex flex-col justify-between px-8 py-12 pointer-events-auto"
							variants={mobileMenuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							{}
							<div className="flex justify-between items-center mb-8">
								<div className="flex items-center gap-2">
									<img src="/images/certify.png" alt="Certify Logo" className="w-6 h-6" />
									<span className="text-lg text-[#F4F4F4] font-lexend font-semibold">Certify</span>
								</div>
								<button
									onClick={() => setMobileMenuOpen(false)}
									className="p-2 rounded-xl text-[#F4F4F4]/70 hover:text-[#F4F4F4] hover:bg-white/10 transition-colors duration-200"
									aria-label="Close menu"
								>
									<X size={24} />
								</button>
							</div>

							{}
							<div className="flex flex-col gap-2 flex-1 justify-center">
								{}
								<div className="relative pl-8">
									<div
										className="absolute left-0 top-0 bottom-0 w-px"
										style={{
											background: 'linear-gradient(to bottom, transparent, rgba(0,183,181,0.7) 30%, rgba(0,183,181,0.7) 70%, transparent)',
										}}
									/>
									{navLinks.map((link, idx) => {
										const isActive = activeHash === link.href;
										return (
											<motion.div
												key={link.name}
												variants={mobileLinkVariants}
												className="relative flex items-center"
											>
												{}
												{isActive && (
													<div className="absolute -left-[4.5px] w-2.5 h-2.5 bg-[#00B7B5] rotate-45 shadow-[0_0_8px_#00B7B5] flex-shrink-0" />
												)}
												<button
													onClick={(e) => handleNavClick(e, link.href)}
													className={`py-4 text-left font-lexend font-bold uppercase tracking-widest transition-colors duration-200 ${
														isActive
															? 'text-[#F4F4F4] text-3xl sm:text-4xl border border-[#00B7B5]/60 px-4 rounded-sm bg-[#00B7B5]/5'
															: 'text-[#F4F4F4]/60 hover:text-[#F4F4F4] text-3xl sm:text-4xl'
													}`}
												>
													{link.name}
												</button>
											</motion.div>
										);
									})}
								</div>
							</div>

							{}
							<motion.div
								variants={mobileLinkVariants}
								className="text-center"
							>
								<p className="text-xs text-[#F4F4F4]/30 font-lexend">Certify Protocol</p>
								<p className="text-xs text-[#F4F4F4]/20 font-lexend">v1.0</p>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
