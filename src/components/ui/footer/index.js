"use client";

import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Link from 'next/link';
import { 
	Mail, 
	MapPin, 
	Phone, 
	Send,
	ArrowRight,
	Zap,
	Shield,
	Globe
} from 'lucide-react';

export default function Footer() {
	const { t, language } = useLanguage();
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

	// Footer links
	const footerLinks = {
		company: [
			{ name: language === 'en' ? 'Home' : 'Beranda', href: '/' },
			{ name: language === 'en' ? 'About' : 'Tentang', href: '/about' },
			{ name: language === 'en' ? 'Contact' : 'Kontak', href: '/contact' },
		],
		product: [
			{ name: language === 'en' ? 'Validate' : 'Validasi', href: '/validate' },
			{ name: language === 'en' ? 'Register' : 'Daftar', href: '/register' },
			{ name: language === 'en' ? 'Features' : 'Fitur', href: '/features' },
		],
		resources: [
			{ name: language === 'en' ? 'FAQ' : 'FAQ', href: '/faq' },
			{ name: language === 'en' ? 'Documentation' : 'Dokumentasi', href: '/docs' },
			{ name: language === 'en' ? 'Support' : 'Bantuan', href: '/support' },
		],
		legal: [
			{ name: language === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi', href: '/privacy' },
			{ name: language === 'en' ? 'Terms of Service' : 'Ketentuan Layanan', href: '/terms' },
		],
	};

	const socialLinks = [];

	const features = [
		{ icon: Shield, text: language === 'en' ? 'Bank-Grade Security' : 'Keamanan Tingkat Bank' },
		{ icon: Zap, text: language === 'en' ? 'Instant Verification' : 'Verifikasi Instan' },
		{ icon: Globe, text: language === 'en' ? 'Global Standards' : 'Standar Global' },
	];

	return (
		<footer className="relative w-full mt-auto pt-16 pb-8 overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#005461] to-transparent" />
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-[#005461]/20 rounded-full blur-[100px]" />
				<div className="absolute top-20 right-1/4 w-64 h-64 bg-[#00b7b5]/10 rounded-full blur-[80px]" />
			</div>

			<div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 mb-12">
					{/* Brand Column */}
					<div className="xl:col-span-3">
						<div className="flex items-center gap-2 mb-4">
							<img src="/images/certify.png" alt="Certify Logo" className="w-8 h-8" />
							<span className="text-2xl font-bold text-[#F4F4F4] font-lexend">Certify</span>
						</div>
						<p className="text-[#F4F4F4]/70 text-sm mb-6 leading-relaxed">
							{language === 'en' 
								? 'The future of certificate verification. Secure, transparent, and tamper-proof verification powered by blockchain technology.'
								: 'Masa depan verifikasi sertifikat. Verifikasi yang aman, transparan, dan anti-pemalsuan yang didukung oleh teknologi blockchain.'
							}
						</p>
						
						{/* Features Badges */}
						<div className="flex flex-wrap gap-2 mb-6">
							{features.map((feature, index) => (
								<div 
									key={index}
									className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#F4F4F4]/80"
								>
									<feature.icon className="w-3.5 h-3.5 text-[#00b7b5]" />
									{feature.text}
								</div>
							))}
						</div>

						
					</div>

					{/* Company Links */}
					<div className="xl:col-span-2">
						<h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
							{language === 'en' ? 'Company' : 'Perusahaan'}
						</h4>
						<ul className="space-y-3">
							{footerLinks.company.map((link, index) => (
								<li key={index}>
									<Link 
										href={link.href}
										className="text-sm text-[#F4F4F4]/60 hover:text-[#00b7b5] transition-colors duration-200 flex items-center gap-1 group"
									>
										<span className="w-1 h-1 rounded-full bg-[#00b7b5]/0 group-hover:bg-[#00b7b5] transition-all" />
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Product Links */}
					<div className="xl:col-span-2">
						<h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
							{language === 'en' ? 'Product' : 'Produk'}
						</h4>
						<ul className="space-y-3">
							{footerLinks.product.map((link, index) => (
								<li key={index}>
									<Link 
										href={link.href}
										className="text-sm text-[#F4F4F4]/60 hover:text-[#00b7b5] transition-colors duration-200 flex items-center gap-1 group"
									>
										<span className="w-1 h-1 rounded-full bg-[#00b7b5]/0 group-hover:bg-[#00b7b5] transition-all" />
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources Links */}
					<div className="xl:col-span-2">
						<h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
							{language === 'en' ? 'Resources' : 'Sumber Daya'}
						</h4>
						<ul className="space-y-3">
							{footerLinks.resources.map((link, index) => (
								<li key={index}>
									<Link 
										href={link.href}
										className="text-sm text-[#F4F4F4]/60 hover:text-[#00b7b5] transition-colors duration-200 flex items-center gap-1 group"
									>
										<span className="w-1 h-1 rounded-full bg-[#00b7b5]/0 group-hover:bg-[#00b7b5] transition-all" />
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter Column */}
					<div className="xl:col-span-3">
						<h4 className="text-sm font-semibold text-[#F4F4F4] mb-4 font-lexend uppercase tracking-wider">
							{language === 'en' ? 'Stay Updated' : 'Tetap Terupdate'}
						</h4>
						<p className="text-xs text-[#F4F4F4]/60 mb-4">
							{language === 'en' 
								? 'Subscribe to our newsletter for the latest updates and features.'
								: 'Berlangganan newsletter kami untuk pembaruan dan fitur terbaru.'
							}
						</p>
						<form onSubmit={handleSubscribe} className="relative">
							<div className="relative">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder={language === 'en' ? 'Enter your email' : 'Masukkan email Anda'}
									className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-[#F4F4F4] text-sm placeholder-[#F4F4F4]/40 focus:outline-none focus:border-[#00b7b5]/50 focus:ring-1 focus:ring-[#00b7b5]/20 transition-all"
									required
								/>
								<button
									type="submit"
									className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-gradient-to-r from-[#005461] to-[#00b7b5] text-white hover:opacity-90 transition-opacity flex items-center justify-center"
								>
									{isSubscribed ? (
										<Shield className="w-4 h-4" />
									) : (
										<Send className="w-4 h-4" />
									)}
								</button>
							</div>
							{isSubscribed && (
								<p className="text-xs text-[#00b7b5] mt-2 animate-pulse">
									{language === 'en' ? '✓ Subscribed successfully!' : '✓ Berhasil berlangganan!'}
								</p>
							)}
						</form>

						{/* Contact Info */}
						<div className="mt-6 space-y-3">
							<div className="flex items-center gap-2 text-sm text-[#F4F4F4]/60">
								<Mail className="w-4 h-4 text-[#00b7b5]" />
								<span>hello@certify.io</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-[#F4F4F4]/60">
								<MapPin className="w-4 h-4 text-[#00b7b5]" />
								<span>{language === 'en' ? 'Padang, Indonesia' : 'Padang, Indonesia'}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-white/10">
					<div className="flex flex-wrap flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left">
						{/* Copyright */}
						<p className="text-sm text-[#F4F4F4]/50">
							© {new Date().getFullYear()} Certify. {language === 'en' ? 'All rights reserved.' : 'Semua hak dilindungi.'}
						</p>

						{/* Legal Links */}
						<div className="flex items-center justify-center gap-4 flex-wrap">
							{footerLinks.legal.map((link, index) => (
								<Link 
									key={index}
									href={link.href}
									className="text-xs text-[#F4F4F4]/50 hover:text-[#00b7b5] transition-colors"
								>
									{link.name}
								</Link>
							))}
						</div>

						{/* Version Badge */}
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
							<span className="w-2 h-2 rounded-full bg-[#00b7b5] animate-pulse" />
							<span className="text-xs text-[#F4F4F4]/60">Certify Protocol v1.0</span>
						</div>
					</div>
				</div>

				{/* Decorative Line */}
				<div className="mt-8 flex items-center justify-center gap-2">
					<div className="w-20 h-px bg-gradient-to-r from-transparent to-[#005461]" />
					<div className="w-1 h-1 rounded-full bg-[#00b7b5]" />
					<div className="w-20 h-px bg-gradient-to-l from-transparent to-[#005461]" />
				</div>
			</div>
		</footer>
	);
}