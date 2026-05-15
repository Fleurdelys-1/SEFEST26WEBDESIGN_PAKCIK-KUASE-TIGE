"use client";

import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Mail, MapPin, Send, Shield, Zap, Globe, ShieldCheck } from 'lucide-react';

export default function Footer() {
	const { t } = useLanguage();
	const [email, setEmail] = useState('');
	const [isSubscribed, setIsSubscribed] = useState(false);

	const handleSubscribe = (e) => {
		e.preventDefault();
		if (email) {
			setIsSubscribed(true);
			setTimeout(() => setIsSubscribed(false), 3000);
			setEmail('');
		}
	};

	const quickLinks = [
		{ name: t('nav.home'), href: '#home' },
		{ name: t('nav.validate'), href: '#validation' },
		{ name: t('nav.about'), href: '#about' },
		{ name: t('nav.faq'), href: '#faq' },
		{ name: t('nav.contact'), href: '#contact' },
	];

	const productLinks = [
		{ name: t('nav.register') || 'Register', href: '/register' },
		{ name: t('footer.featuresLink') || 'Features', href: '#about' },
		{ name: 'Blockchain Verify', href: '#validation' },
	];

	const legalLinks = [
		{ name: t('footer.privacyPolicy') || 'Privacy Policy', href: '/privacy' },
		{ name: t('footer.termsOfService') || 'Terms of Service', href: '/terms' },
	];

	const features = [
		{ icon: ShieldCheck, label: t('footer.features.security') || 'Blockchain-Secured' },
		{ icon: Zap, label: t('footer.features.instant') || 'Instant Verify' },
		{ icon: Globe, label: t('footer.features.global') || 'Global Standard' },
	];

	const handleScrollTo = (e, href) => {
		e.preventDefault();
		if (href.startsWith('#')) {
			const el = document.getElementById(href.replace('#', ''));
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<footer className="relative w-full overflow-hidden">
			{/* Top separator line */}
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00B7B5]/40 to-transparent" />

			{/* Background glows */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-0 left-1/4 w-80 h-80 bg-[#005461]/20 rounded-full blur-[120px]" />
				<div className="absolute top-10 right-1/4 w-60 h-60 bg-[#00b7b5]/10 rounded-full blur-[90px]" />
			</div>

			<div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-14 pb-8">

				{/* Main grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-8 xl:gap-10 mb-12">

					{/* Brand column */}
					<div className="sm:col-span-2 xl:col-span-4">
						<div className="flex items-center gap-2.5 mb-4">
							<img src="/images/certify.png" alt="Certify Logo" className="w-7 h-7" />
							<span className="text-xl font-bold text-[#F4F4F4] font-lexend tracking-tight">Certify</span>
						</div>
						<p className="text-[#F4F4F4]/60 text-sm leading-relaxed mb-6 max-w-xs">
							{t('footer.description') || 'The next era of certificate verification. Powered by blockchain — tamper-proof, instant, and trusted globally.'}
						</p>

						{/* Feature pills */}
						<div className="flex flex-wrap gap-2">
							{features.map((f, i) => (
								<span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#F4F4F4]/70">
									<f.icon className="w-3.5 h-3.5 text-[#00B7B5]" />
									{f.label}
								</span>
							))}
						</div>
					</div>

					{/* Quick links */}
					<div className="xl:col-span-2">
						<h4 className="text-xs font-bold text-[#F4F4F4]/50 mb-4 uppercase tracking-widest font-lexend">
							{t('footer.company') || 'Navigate'}
						</h4>
						<ul className="space-y-2.5">
							{quickLinks.map((link, i) => (
								<li key={i}>
									<a
										href={link.href}
										onClick={(e) => handleScrollTo(e, link.href)}
										className="group text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 flex items-center gap-2"
									>
										<span className="w-1 h-1 rounded-full bg-[#00B7B5]/0 group-hover:bg-[#00B7B5] transition-all duration-200" />
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Product links */}
					<div className="xl:col-span-2">
						<h4 className="text-xs font-bold text-[#F4F4F4]/50 mb-4 uppercase tracking-widest font-lexend">
							{t('footer.product') || 'Product'}
						</h4>
						<ul className="space-y-2.5">
							{productLinks.map((link, i) => (
								<li key={i}>
									<a
										href={link.href}
										onClick={(e) => handleScrollTo(e, link.href)}
										className="group text-sm text-[#F4F4F4]/60 hover:text-[#00B7B5] transition-colors duration-200 flex items-center gap-2"
									>
										<span className="w-1 h-1 rounded-full bg-[#00B7B5]/0 group-hover:bg-[#00B7B5] transition-all duration-200" />
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div className="sm:col-span-2 xl:col-span-4">
						<h4 className="text-xs font-bold text-[#F4F4F4]/50 mb-4 uppercase tracking-widest font-lexend">
							{t('footer.stayUpdated') || 'Stay Updated'}
						</h4>
						<p className="text-xs text-[#F4F4F4]/50 mb-4 leading-relaxed">
							{t('footer.newsletter.description') || 'Get the latest updates on Certify features and blockchain certificate news.'}
						</p>
						<form onSubmit={handleSubscribe} className="relative mb-5">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder={t('footer.newsletter.placeholder') || 'your@email.com'}
								className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-[#F4F4F4] text-sm placeholder-[#F4F4F4]/30 focus:outline-none focus:border-[#00B7B5]/50 focus:ring-1 focus:ring-[#00B7B5]/20 transition-all"
								required
							/>
							<button
								type="submit"
								className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-to-r from-[#005461] to-[#00B7B5] text-white hover:opacity-90 transition-opacity flex items-center justify-center"
							>
								{isSubscribed ? <Shield className="w-4 h-4" /> : <Send className="w-4 h-4" />}
							</button>
							{isSubscribed && (
								<p className="text-xs text-[#00B7B5] mt-2 animate-pulse">
									{t('footer.newsletter.subscribed') || '✓ Subscribed successfully!'}
								</p>
							)}
						</form>

						{/* Contact info */}
						<div className="space-y-2">
							<div className="flex items-center gap-2 text-sm text-[#F4F4F4]/50">
								<Mail className="w-3.5 h-3.5 text-[#00B7B5] flex-shrink-0" />
								<span>hello@certify.io</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-[#F4F4F4]/50">
								<MapPin className="w-3.5 h-3.5 text-[#00B7B5] flex-shrink-0" />
								<span>{t('footer.contact.location') || 'Jakarta, Indonesia'}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="pt-6 border-t border-white/[0.07]">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">

						{/* Copyright */}
						<p className="text-xs text-[#F4F4F4]/40 text-center sm:text-left">
							© {new Date().getFullYear()} Certify. {t('footer.copyright') || 'All rights reserved.'}
						</p>

						{/* Legal links */}
						<div className="flex items-center gap-4 flex-wrap justify-center">
							{legalLinks.map((link, i) => (
								<a
									key={i}
									href={link.href}
									className="text-xs text-[#F4F4F4]/40 hover:text-[#00B7B5] transition-colors duration-200"
								>
									{link.name}
								</a>
							))}
						</div>

						{/* Protocol badge */}
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
							<span className="w-1.5 h-1.5 rounded-full bg-[#00B7B5] animate-pulse shadow-[0_0_6px_#00B7B5]" />
							<span className="text-xs text-[#F4F4F4]/50 font-lexend">
								{t('footer.protocol') || 'Certify Protocol v1.0'}
							</span>
						</div>
					</div>
				</div>

			</div>
		</footer>
	);
}